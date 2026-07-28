import { useEffect, useId, useMemo } from 'react';

interface PostIconFieldProps {
    currentImageUrl?: string;
    error?: string;
    onChange: (file: File | null) => void;
    value: File | null;
}

export default function PostIconField({
    currentImageUrl,
    error,
    onChange,
    value,
}: PostIconFieldProps) {
    const inputId = useId();
    const previewUrl = useMemo(
        () => (value === null ? currentImageUrl : URL.createObjectURL(value)),
        [currentImageUrl, value],
    );

    useEffect(() => {
        if (value === null || previewUrl === undefined) {
            return;
        }

        return () => URL.revokeObjectURL(previewUrl);
    }, [previewUrl, value]);

    return (
        <div>
            <label className="mb-2 block text-xs font-bold text-[#f0ebeb]">
                一覧アイコン画像:
            </label>
            <div className="flex items-center gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden border-3 border-double border-[#624747] bg-[#110e0e] text-[10px] text-[#756a6a]">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="一覧アイコンのプレビュー"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        'NO IMAGE'
                    )}
                </div>
                <div className="min-w-0">
                    <label
                        htmlFor={inputId}
                        className="da-button inline-block cursor-pointer"
                    >
                        画像を選択
                    </label>
                    <input
                        id={inputId}
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="sr-only"
                        onChange={(event) =>
                            onChange(event.target.files?.[0] ?? null)
                        }
                    />
                    <p className="mt-2 truncate text-[10px] text-[#887e7e]">
                        {value?.name ??
                            (currentImageUrl
                                ? '現在の画像を使用中'
                                : 'JPG / PNG / GIF / WebP・5MBまで')}
                    </p>
                </div>
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
