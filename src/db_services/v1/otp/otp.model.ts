// v1/otp-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { Actions } from '../../../services/v1/authenticate/interfaces/AuthenticationInterface';

export default function (app: Application): Model<any> {
    const modelName = 'otp';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
            otp: {
                type: String,
            },
            expireOn: {
                type: Date,
            },
            token: {
                type: String,
            },
            purpose: {
                type: String,
                enum: Actions,
                required: true,
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
