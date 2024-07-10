import moment from 'moment';
import { UploadUtilities } from '../../../../utils/UploadUtilities/UploadUtilities';
import fs from 'fs';
import extractThumbnailForVideo from '../../../../utils/extractThumbnailForVideo';
import { BadRequest } from '@feathersjs/errors';
import getVideoDurationInSeconds from 'get-video-duration';
import { rimraf } from 'rimraf';

const getLinkAndThumbnailForVideo = async (
    file: Express.Multer.File,
    bucketName: string,
    purpose: string,
    host:string
): Promise<{ uploadUrl: string; thumbnailUrl: string; duration: number }> => {
    const { mimetype, originalname, buffer } = file;
    const timestamp = Date.now();
    const folder1 = moment(new Date()).format('YYYY');
    const folder2 = moment(new Date()).format('MMDD');
    const fileKey = `${purpose}/videos/${folder1}/${folder2}/${timestamp}_${originalname}`;
    const thumbnailKey = `${purpose}/videos/${folder1}/${folder2}/${timestamp}_thumbnail_${originalname.substring(
        0,
        originalname.lastIndexOf('.'),
    )}.jpg`;

    const uploadData = await UploadUtilities.uploadFileToS3(fileKey, buffer, mimetype, bucketName);
    const uploadUrl = uploadData.Location;

    /*create temp directory*/

    const dir = `src/db_services/v1/upload/temp/video_${timestamp}`;
    const videoFileKey = `${dir}/${timestamp}_${originalname}`;
    const thumbnailFileKey = `${dir}/${timestamp}_thumbnail_${Date.now()}_picture_1.jpg`;

    /* Write file and extract thumbnail.*/

    fs.mkdirSync(dir);
    fs.writeFileSync(videoFileKey, buffer);
    await extractThumbnailForVideo(videoFileKey, thumbnailFileKey).catch(() => {
        throw new BadRequest('Video can not be sent.');
    });

    const thumbnailData = await UploadUtilities.uploadFileToS3(
        thumbnailKey,
        fs.readFileSync(thumbnailFileKey),
        'image/jpeg',
        bucketName,
    );
    const thumbnailUrl = thumbnailData.Location;
    const duration = await getVideoDurationInSeconds(videoFileKey);

    rimraf.sync(dir);

    return {
        uploadUrl,
        thumbnailUrl,
        duration: parseFloat(duration.toFixed(0)),
    };
};

export default getLinkAndThumbnailForVideo;
