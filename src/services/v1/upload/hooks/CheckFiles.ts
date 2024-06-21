/**
 * Created By Soumya(soumya\@smartters.in) on 2/23/2022 at 12:01 AM.
 */
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import moment from 'moment';
import { UploadUtilities } from '../../../../utils/UploadUtilities/UploadUtilities';

const fileTypes = [1, 2];
const purposes = ['profile', 'kyc', 'country', 'chat'];

/**
 *  upload all files.
 */
const CheckFiles = () => async (context: HookContext) => {
    const { data, app } = context;

    const { files, fileType, purpose } = data;

    if (!fileTypes.includes(parseInt(fileType))) throw new BadRequest('Please provide a valid file type.');

    if (!purposes.includes(purpose)) throw new BadRequest('Please provide a valid purpose.');

    const bucket = app.get('aws-bucket');
    const s3 = app.get('s3');

    const uploadedFiles: string[] = [];

    for (const file of files) {
        const fileType = file.mimeType;

        const timestamp = Date.now();
        const fileName = file.originalname;
        const folder1 = moment(new Date()).format('YYYY');
        const folder2 = moment(new Date()).format('MMDD');
        const fileKey = `${purpose}/${folder1}/${folder2}/${timestamp}_${fileName}`;

        const uploadData = await UploadUtilities.uploadFileToS3(fileKey, file.buffer, fileType, bucket);

        if (!uploadData) {
            throw new BadRequest('Error while uploading. Please try after some time.');
        }

        const filePath = uploadData.Location;

        uploadedFiles.push(filePath);
    }

    context.data = uploadedFiles.map((e) => {
        return {
            purpose,
            filePath: e,
            fileType,
        };
    });

    context.params.query = {
        $limit: uploadedFiles.length,
    };
};

export default CheckFiles;
