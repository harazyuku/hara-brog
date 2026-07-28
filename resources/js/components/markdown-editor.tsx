import { useHttp } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { preview } from '@/routes/markdown';

interface MarkdownEditorProps {
    error?: string;
    onChange: (value: string) => void;
    rows?: number;
    value: string;
}

interface MarkdownPreviewResponse {
    html: string;
}

function MarkdownEditor({
    error,
    onChange,
    rows = 16,
    value,
}: MarkdownEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const historyRef = useRef([value]);
    const historyIndexRef = useRef(0);
    const historyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const [previewHtml, setPreviewHtml] = useState('');
    const [historyState, setHistoryState] = useState({
        canRedo: false,
        canUndo: false,
    });
    const previewRequest = useHttp<
        { content: string },
        MarkdownPreviewResponse
    >({
        content: '',
    });

    useEffect(() => {
        return () => {
            if (historyTimerRef.current) {
                clearTimeout(historyTimerRef.current);
            }
        };
    }, []);

    const updateHistoryState = () => {
        setHistoryState({
            canUndo: historyIndexRef.current > 0,
            canRedo: historyIndexRef.current < historyRef.current.length - 1,
        });
    };

    const saveHistory = (nextValue: string) => {
        const currentValue = historyRef.current[historyIndexRef.current];

        if (currentValue === nextValue) {
            return;
        }

        historyRef.current = [
            ...historyRef.current.slice(0, historyIndexRef.current + 1),
            nextValue,
        ];
        historyIndexRef.current = historyRef.current.length - 1;
        updateHistoryState();
    };

    const flushPendingHistory = () => {
        if (historyTimerRef.current) {
            clearTimeout(historyTimerRef.current);
            historyTimerRef.current = null;
        }

        saveHistory(value);
    };

    const changeContent = (nextValue: string) => {
        onChange(nextValue);

        if (historyTimerRef.current) {
            clearTimeout(historyTimerRef.current);
        }

        historyTimerRef.current = setTimeout(() => {
            saveHistory(nextValue);
            historyTimerRef.current = null;
        }, 400);
    };

    const undo = () => {
        flushPendingHistory();

        if (historyIndexRef.current === 0) {
            return;
        }

        historyIndexRef.current -= 1;
        onChange(historyRef.current[historyIndexRef.current]);
        updateHistoryState();
    };

    const redo = () => {
        flushPendingHistory();

        if (historyIndexRef.current >= historyRef.current.length - 1) {
            return;
        }

        historyIndexRef.current += 1;
        onChange(historyRef.current[historyIndexRef.current]);
        updateHistoryState();
    };

    const insertMarkdown = (
        prefix: string,
        suffix = '',
        placeholder = 'テキスト',
    ) => {
        const textarea = textareaRef.current;

        if (!textarea) {
            return;
        }

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.slice(start, end) || placeholder;
        const insertedText = `${prefix}${selectedText}${suffix}`;
        const nextValue = `${value.slice(0, start)}${insertedText}${value.slice(end)}`;

        flushPendingHistory();
        onChange(nextValue);
        saveHistory(nextValue);

        requestAnimationFrame(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + prefix.length,
                start + prefix.length + selectedText.length,
            );
        });
    };

    const showPreview = async () => {
        setMode('preview');

        if (!value.trim()) {
            setPreviewHtml('');

            return;
        }

        previewRequest.setData('content', value);
        const response = await previewRequest.submit(preview());
        setPreviewHtml(response.html);
    };

    return (
        <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border border-[#554949] bg-[#171313] p-1">
                <div className="flex flex-wrap gap-1">
                    <button
                        type="button"
                        className="da-button min-w-9"
                        title="見出し"
                        onClick={() => insertMarkdown('## ', '', '見出し')}
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        className="da-button min-w-9"
                        title="太字"
                        onClick={() => insertMarkdown('**', '**', '太字')}
                    >
                        B
                    </button>
                    <button
                        type="button"
                        className="da-button"
                        title="リンク"
                        onClick={() =>
                            insertMarkdown('[', '](https://)', 'リンク名')
                        }
                    >
                        LINK
                    </button>
                    <button
                        type="button"
                        className="da-button min-w-9"
                        title="箇条書き"
                        onClick={() => insertMarkdown('- ', '', '項目')}
                    >
                        LIST
                    </button>
                    <button
                        type="button"
                        className="da-button min-w-9"
                        title="コード"
                        onClick={() => insertMarkdown('`', '`', 'code')}
                    >
                        CODE
                    </button>
                    <span className="mx-1 border-l border-[#554949]" />
                    <button
                        type="button"
                        className="da-button"
                        disabled={!historyState.canUndo}
                        onClick={undo}
                    >
                        UNDO
                    </button>
                    <button
                        type="button"
                        className="da-button"
                        disabled={!historyState.canRedo}
                        onClick={redo}
                    >
                        REDO
                    </button>
                </div>

                <div className="flex gap-1">
                    <button
                        type="button"
                        className={`da-button ${mode === 'edit' ? 'text-[#ff8b8b]' : ''}`}
                        onClick={() => setMode('edit')}
                    >
                        編集
                    </button>
                    <button
                        type="button"
                        className={`da-button ${mode === 'preview' ? 'text-[#ff8b8b]' : ''}`}
                        disabled={previewRequest.processing}
                        onClick={showPreview}
                    >
                        {previewRequest.processing ? '変換中...' : 'プレビュー'}
                    </button>
                </div>
            </div>

            {mode === 'edit' ? (
                <>
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(event) => changeContent(event.target.value)}
                        onKeyDown={(event) => {
                            const usesShortcutKey =
                                event.metaKey || event.ctrlKey;

                            if (!usesShortcutKey || event.key !== 'z') {
                                return;
                            }

                            event.preventDefault();

                            if (event.shiftKey) {
                                redo();
                            } else {
                                undo();
                            }
                        }}
                        rows={rows}
                        className="retro-input resize-y font-mono text-sm leading-7"
                        placeholder={
                            '## 見出し\n\n本文を書きます。\n\n- 箇条書き\n- **太字**'
                        }
                    />
                    <p className="mt-2 text-[10px] text-[#887e7e]">
                        Markdown対応：見出し、太字、リンク、箇条書き、引用、コード
                    </p>
                </>
            ) : (
                <div className="markdown-body min-h-96 border border-[#554949] bg-[#0d0c0c] p-4">
                    {previewHtml ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                        />
                    ) : (
                        <p className="text-xs text-[#887e7e]">
                            プレビューする本文がありません。
                        </p>
                    )}
                </div>
            )}

            {(error || previewRequest.errors.content) && (
                <p className="mt-1 text-xs text-red-500">
                    {error || previewRequest.errors.content}
                </p>
            )}
        </div>
    );
}

export default MarkdownEditor;
