import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

/**
 * Extract thumbnail from video.
 * @param imageKey
 * @param thumbnailKey
 */
const extractThumbnailForImage = async (imageKey: string, thumbnailKey: string) => {
    ffmpeg.setFfmpegPath(ffmpegPath.path);

    return new Promise((resolve, reject) => {
        ffmpeg(imageKey)
            .screenshots(
                {
                    count: 1,
                    filename: thumbnailKey,
                },
                '',
            )
            .on('end', () => {
                console.log('success');
                resolve(1);
            })
            .on('error', (e) => {
                console.error(e);
                reject('Can not extract thumbnail.');
            });
    });
};

export default extractThumbnailForImage;
