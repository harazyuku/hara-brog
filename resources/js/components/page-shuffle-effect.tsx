import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

interface AnimatedTextNode {
    node: Text;
    originalCharacters: string[];
    revealPoints: number[];
}

const blockCharacters = Array.from('░▒▓█');
const duration = 600;

export default function PageShuffleEffect() {
    const animationFrameRef = useRef<number>(0);
    const scheduledFrameRef = useRef<number>(0);
    const visitedPathsRef = useRef(new Set<string>());

    useEffect(() => {
        const start = () => {
            cancelAnimationFrame(animationFrameRef.current);

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            const textNodes: AnimatedTextNode[] = [];
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
            );

            while (walker.nextNode()) {
                const node = walker.currentNode as Text;
                const parent = node.parentElement;
                const text = node.textContent ?? '';

                if (
                    !parent ||
                    text.trim() === '' ||
                    parent.closest(
                        'script, style, textarea, option, .sr-only, [aria-hidden="true"], [data-no-shuffle]',
                    )
                ) {
                    continue;
                }

                const originalCharacters = Array.from(text);

                textNodes.push({
                    node,
                    originalCharacters,
                    revealPoints: originalCharacters.map(
                        (_, index) =>
                            Math.random() *
                                (1 - index / originalCharacters.length) +
                            index / originalCharacters.length,
                    ),
                });
            }

            const startedAt = performance.now();

            const animate = (currentTime: number) => {
                const progress = Math.min(
                    (currentTime - startedAt) / duration,
                    1,
                );

                for (const {
                    node,
                    originalCharacters,
                    revealPoints,
                } of textNodes) {
                    if (!node.isConnected) {
                        continue;
                    }

                    node.textContent = originalCharacters
                        .map((character, index) => {
                            if (character.trim() === '') {
                                return character;
                            }

                            if (progress >= revealPoints[index]) {
                                return character;
                            }

                            if (progress < revealPoints[index] / 3) {
                                return '.';
                            }

                            return blockCharacters[
                                Math.floor(
                                    Math.random() * blockCharacters.length,
                                )
                            ];
                        })
                        .join('');
                }

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const scheduleStart = () => {
            cancelAnimationFrame(scheduledFrameRef.current);
            scheduledFrameRef.current = requestAnimationFrame(start);
        };

        visitedPathsRef.current.add(window.location.pathname);
        scheduleStart();

        const removeFinishListener = router.on('finish', () => {
            const currentPath = window.location.pathname;

            if (visitedPathsRef.current.has(currentPath)) {
                return;
            }

            visitedPathsRef.current.add(currentPath);
            scheduleStart();
        });

        return () => {
            removeFinishListener();
            cancelAnimationFrame(animationFrameRef.current);
            cancelAnimationFrame(scheduledFrameRef.current);
        };
    }, []);

    return null;
}
