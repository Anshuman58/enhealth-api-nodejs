
import { HookContext } from '@feathersjs/feathers';
import { BadRequest, FeathersError } from '@feathersjs/errors';
import moment from 'moment';
import { UploadUtilities } from '../utils/UploadUtilities/UploadUtilities';
import AWS from 'aws-sdk';

const UploadFiles = () => async (context: HookContext) => {
    const { data, app } = context;

    const { files } = data;

    // const bucket = app.get('aws-bucket');
    // const s3 = app.get('s3');

    const uploadedFiles: Array<AWS.S3.ManagedUpload.SendData | { Location: string; Key: string }> = [];

    for (const file of files) {
        const fileType = file.mimeType;

        const timestamp = Date.now();
        const fileName = file.originalname;
        const folder1 = moment(new Date()).format('YYYY');
        const folder2 = moment(new Date()).format('MMDD');
        const fileKey = `public/uploads/${folder1}/${folder2}/${timestamp}_${fileName}`;

        const uploadData = await UploadUtilities.uploadFileToServer(
            fileKey,
            file.buffer,
            'http://localhost:3030',
        ).catch((e: FeathersError) => {
            throw new BadRequest(e.message);
        });

        if (!uploadData) {
            throw new BadRequest('Error while uploading. Please try after some time.');
        }

        uploadedFiles.push(uploadData);
    }

    context.result = uploadedFiles.map((e) => {
        return {
            location: e.Location,
            key: e.Key,
        };
    });
};

export default UploadFiles;
