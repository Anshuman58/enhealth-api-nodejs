// ../db_services/v1/master-data/language-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { LanguageStatus } from './interfaces/LanguageInterfaces';

export default function (app: Application): Model<any> {
    const modelName = 'language';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema?.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            status: {
                type: Number,
                enum: LanguageStatus,
                default: LanguageStatus.ACTIVE,
            },
        },
        {
            timestamps: true,
        },
    );

    schema.index({
        name: 'text',
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}
