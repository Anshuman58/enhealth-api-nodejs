// ../db_services/v1/upload-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { FilePurpose, FileType } from './Interface/UploadInterface';
import { EntityStatus } from '../../../constants/EntityStatus';

export default function (app: Application): Model<any> {
    const modelName = 'upload';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema?.Types;
    const schema = new Schema(
        {
            user: {
                type: ObjectId,
                ref: 'user',
            },
            purpose: {
                type: String,
                enum: FilePurpose,
                required: true,
            },
            fileType: {
                type: Number,
                enum: FileType,
                required: true,
            },
            thumbnail: {
                type: String,
            },
            link: {
                type: String,
                required: true,
            },
            metadata: {
                size: {
                    type: Number,
                },
                duration: {
                    type: Number,
                },
            },
            status: {
                type: Number,
                enum: EntityStatus,
                default: EntityStatus.ACTIVE,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}
