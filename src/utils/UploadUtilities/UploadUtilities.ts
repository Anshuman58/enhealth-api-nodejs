import { S3Utilities } from '../S3Utilities/S3Utilities';
import * as fs from 'fs';
import { BadRequest } from '@feathersjs/errors';
import AWS from 'aws-sdk';
import { UploadToServerInterface } from './UploadUtilityInterface';

/**
 * This class contains all the utility functions
 * for upload api implementation in different
 * scenarios.
 */
export class UploadUtilities {
    /**
     * Checks and create directory if does not exist.
     *
     * @param directoryPath - The path for the directory assuming only the directory path is given without the file name.
     */
    static async checkAndCreateDirectory(directoryPath: string): Promise<void> {
        if (!directoryPath.includes('/') || fs.statSync(directoryPath, { throwIfNoEntry: false })) {
            return;
        }
        if (!fs.statSync(directoryPath, { throwIfNoEntry: false })) {
            await this.checkAndCreateDirectory(directoryPath.substring(0, directoryPath.lastIndexOf('/')));
            fs.mkdirSync(directoryPath);
        }
    }

    /**
     * It checks the path to store the file. If the path does not exist
     * then that will be created and then the File will be stored in
     * that specified location.
     *
     * @param filePath - The complete path where the file will be stored. Include the file name also.
     * @param fileBuffer - The content of the file in Buffer format.
     * @param host - The host address of the server.
     *
     * @returns The location of the file through which it can be accessed from
     * the client side and the key path for the file to be used in the server
     */
    static async uploadFileToServer(
        filePath: string,
        fileBuffer: Buffer,
        host: string,
    ): Promise<UploadToServerInterface> {
        try {
            await this.checkAndCreateDirectory(filePath.substring(0, filePath.lastIndexOf('/')));
            fs.writeFileSync(filePath, fileBuffer);
            const location = `${host}/${filePath.replace('public/', '')}`;
            return {
                Location: location,
                Key: filePath,
            };
        } catch (e: any) {
            throw new BadRequest(e.message);
        }
    }

    /**
     * Upload the provided file to the s3 bucket and return the response received
     * from the aws s3 to the caller.
     *
     * @remarks
     *
     * This function can upload only a single file to s3 bucket.
     *
     * @param filePath - The complete path with the file name in which file will be stored in the s3 bucket.
     * @param fileBuffer - Content of the file in buffer format.
     * @param fileType - Content type of the file.
     * @param bucket - Bucket of s3 where the file will be stored.
     *
     * @returns The response got from the aws s3 PutObject API which contains the file information according to s3.
     */
    static async uploadFileToS3(
        filePath: string,
        fileBuffer: Buffer,
        fileType: string,
        bucket: string,
    ): Promise<AWS.S3.ManagedUpload.SendData> {
        return await S3Utilities.uploadFile(filePath, fileBuffer, fileType, bucket).catch((e) => {
            throw new BadRequest(e.message);
        });
    }
}
