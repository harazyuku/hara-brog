import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type InlineGifProps = Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    'height' | 'width'
>;

export default function InlineGif({
    alt = '',
    className,
    ...props
}: InlineGifProps) {
    return (
        <img
            {...props}
            alt={alt}
            aria-hidden={alt === '' ? true : undefined}
            className={cn(
                'inline-block size-[1em] shrink-0 object-contain align-[-0.12em] [image-rendering:pixelated]',
                className,
            )}
            width="16"
            height="16"
            draggable={false}
        />
    );
}
