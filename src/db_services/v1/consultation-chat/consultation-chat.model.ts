// ../db_services/v1/consultation-chat-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'consultationChat';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            user: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            doctor: {
                type: ObjectId,
                ref: 'user',
            },
            text: {
                type: String,
            },
            attachment: {
                type: String,
            },
            status: {
                type: Number,
                enum: [
                    1, //active
                    2, //deleted
                ],
                default: 1,
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
