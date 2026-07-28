<?php

namespace App\Support;

use GdImage;
use Illuminate\Http\UploadedFile;
use RuntimeException;

class PostIconProcessor
{
    private const int IconSize = 160;

    public function process(UploadedFile $uploadedFile): string
    {
        $contents = file_get_contents($uploadedFile->getRealPath());
        $source = $contents === false
            ? false
            : imagecreatefromstring($contents);

        if (! $source instanceof GdImage) {
            throw new RuntimeException('一覧アイコン画像を読み込めませんでした。');
        }

        $source = $this->applyExifOrientation($source, $uploadedFile);
        $sourceWidth = imagesx($source);
        $sourceHeight = imagesy($source);
        $cropSize = min($sourceWidth, $sourceHeight);
        $sourceX = (int) (($sourceWidth - $cropSize) / 2);
        $sourceY = (int) (($sourceHeight - $cropSize) / 2);

        $icon = imagecreatetruecolor(self::IconSize, self::IconSize);
        imagealphablending($icon, false);
        imagesavealpha($icon, true);

        imagecopyresampled(
            $icon,
            $source,
            0,
            0,
            $sourceX,
            $sourceY,
            self::IconSize,
            self::IconSize,
            $cropSize,
            $cropSize,
        );

        ob_start();
        $encoded = imagewebp($icon, null, 82);
        $iconContents = ob_get_clean();

        imagedestroy($source);
        imagedestroy($icon);

        if (! $encoded || $iconContents === false) {
            throw new RuntimeException('一覧アイコン画像を変換できませんでした。');
        }

        return $iconContents;
    }

    private function applyExifOrientation(
        GdImage $image,
        UploadedFile $uploadedFile,
    ): GdImage {
        if (
            $uploadedFile->getMimeType() !== 'image/jpeg'
            || ! function_exists('exif_read_data')
        ) {
            return $image;
        }

        $exif = @exif_read_data($uploadedFile->getRealPath());
        $orientation = is_array($exif) ? ($exif['Orientation'] ?? null) : null;
        $angle = match ($orientation) {
            3 => 180,
            6 => -90,
            8 => 90,
            default => 0,
        };

        if ($angle === 0) {
            return $image;
        }

        $oriented = imagerotate($image, $angle, 0);

        if (! $oriented instanceof GdImage) {
            return $image;
        }

        imagedestroy($image);

        return $oriented;
    }
}
