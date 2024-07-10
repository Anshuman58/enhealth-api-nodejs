import moment from 'moment';
import { UploadUtilities } from '../../../../utils/UploadUtilities/UploadUtilities';

const getLinkForDocument = async (
    file: Express.Multer.File,
    bucketName: string,
    purpose: string,
    host: string,
): Promise<{ uploadUrl: string }> => {
    const { mimetype, originalname, buffer } = file;
    const timestamp = Date.now();

    const folder1 = moment(new Date()).format('YYYY');
    const folder2 = moment(new Date()).format('MMDD');
    const fileKey = `public/${purpose}/documents/${folder1}/${folder2}/${timestamp}_${originalname}`;

    // Upload the file.
    // const uploadData = await S3Utilities.uploadFile(fileKey, buffer, mimetype, bucketName);
    const uploadData = await UploadUtilities.uploadFileToServer(fileKey, buffer, host);
    const uploadUrl = uploadData.Location;

    return {
        uploadUrl,
    };
};

export default getLinkForDocument;
