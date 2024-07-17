import { FilePurpose } from '../Interface/UploadInterface';
import moment from 'moment/moment';
import { UploadUtilities } from '../../../../utils/UploadUtilities/UploadUtilities';
import imageThumbnail from 'image-thumbnail';

const getLinkAndThumbnailForImage = async (
    file: Express.Multer.File,
    bucketName: string,
    purpose: FilePurpose,
    host: string,
): Promise<{ uploadUrl: string; thumbnailUrl: string }> => {
    const { mimetype, originalname, buffer } = file;
    const timestamp = Date.now();
    const folder1 = moment(new Date()).format('YYYY');
    const folder2 = moment(new Date()).format('MMDD');
    const fileKey = `${purpose}/images/${folder1}/${folder2}/${timestamp}_${originalname}`;
    const thumbnailKey = `${purpose}/images/${folder1}/${folder2}/${timestamp}_thumbnail_${originalname.substring(
        0,
        originalname.lastIndexOf('.'),
    )}.jpg`;

    // const fileKey = `public/${purpose}/images/${folder1}/${folder2}/${timestamp}_${originalname}`;
    // const thumbnailKey = `public/${purpose}/images/${folder1}/${folder2}/${timestamp}_thumbnail_${originalname.substring(
    //     0,
    //     originalname.lastIndexOf('.'),
    // )}.jpg`;

    const uploadData = await UploadUtilities.uploadFileToS3(fileKey, buffer, mimetype, bucketName);
    // const uploadData = await UploadUtilities.uploadFileToServer(fileKey, buffer, host);
    const uploadUrl = uploadData.Location;

    const dir = `src/services/v1/upload-media/temp/image_${timestamp}`;

    const thumbnail = await imageThumbnail(buffer, {
        percentage: 50,
        responseType: 'buffer',
    });

    const thumbnailData = await UploadUtilities.uploadFileToS3(thumbnailKey, thumbnail, mimetype, bucketName);
    const thumbnailUrl = thumbnailData.Location;

    return {
        uploadUrl,
        thumbnailUrl,
    };
};

export default getLinkAndThumbnailForImage;
