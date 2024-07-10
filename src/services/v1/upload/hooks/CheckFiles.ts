import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { FileType, upload_POST } from '../Interface/UploadInterface';
import getLinkAndThumbnailForImage from '../utils/getLinkAndThumbnailForImage';
import { Types } from 'mongoose';
import getLinkForDocument from '../utils/getLinkForDocument';

/**
 *  upload all files.
 */
const CheckFiles = () => async (context: HookContext) => {
    const { data, app, params } = context;

    const { files, fileType, purpose } = data;

    // console.log(type);

    if (!FileType[parseInt(fileType)]) throw new BadRequest('Please provide a valid file type.');

    const bucket = app.get('aws_bucket');

    const uploadedFiles: upload_POST[] = [];

    for (const file of files) {
        // const fileType = file.mimetype;
        let thumbnailUrl = '';
        let uploadUrl = '';
        const duration = 0;
        const size = file.size;
        const host = params.headers?.host;

        if (fileType === FileType.VIDEO) return context;

        switch (parseInt(fileType)) {
            case FileType.IMAGE:
                const imageUploadData = await getLinkAndThumbnailForImage(file, bucket, purpose, host);
                thumbnailUrl = imageUploadData.thumbnailUrl;
                uploadUrl = imageUploadData.uploadUrl;
                break;

            // case FileType.VIDEO:
            //     const videoUploadData = await getLinkAndThumbnailForVideo(file, bucket, purpose);
            //     thumbnailUrl = videoUploadData.thumbnailUrl;
            //     uploadUrl = videoUploadData.uploadUrl;
            //     duration = videoUploadData.duration;
            //     break;

            case FileType.DOCUMENT:
                const docUploadData = await getLinkForDocument(file, bucket, purpose, host);
                uploadUrl = docUploadData.uploadUrl;
                break;
            default:
                throw new BadRequest('Invalid upload file type.');
        }

        uploadedFiles.push({
            user: data?.user as Types.ObjectId,
            fileType: parseInt(fileType),
            purpose,
            link: uploadUrl,
            thumbnail: thumbnailUrl,
            metadata: {
                size: size,
                duration: duration ? duration : undefined,
            },
        });
    }

    context.data = uploadedFiles;
    context.params.query = {
        $limit: uploadedFiles.length,
    };
};

export default CheckFiles;
