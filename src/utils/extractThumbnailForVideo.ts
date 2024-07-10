import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

/**
 * Extract thumbnail from video.
 * @param videoKey
 * @param thumbnailKey
 */
const extractThumbnailForVideo = async (videoKey: string, thumbnailKey: string) => {
    ffmpeg.setFfmpegPath(ffmpegPath.path);

    return new Promise((resolve, reject) => {
        ffmpeg(videoKey)
            .takeScreenshots(
                {
                    count: 1,
                    filename: thumbnailKey,
                    timemarks: ['00:00:02.000'],
                },
                '',
            )
            .on('end', () => {
                resolve(1);
            })
            .on('error', () => {
                reject('Can not extract thumbnail.');
            });
    });
};

export default extractThumbnailForVideo;
