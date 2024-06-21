// ../db_services/v1/user-session-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';
import {DeviceType, SessionStatus} from "./Interface/UserSessionInterface";

export default function (app: Application): Model<any> {
    const modelName = 'userSession';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema?.Types;
    const schema = new Schema(
        {
            user: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            deviceId: {
                type: String,
                required: true,
            },
            deviceType: {
                type: Number,
                enum: DeviceType,
                required: true,
            },
            deviceName: {
                type: String,
            },
            fcmId: {
                type: String,
            },
            accessToken: {
                type: String,
                required: true,
            },
            ip: {
                type: String,
                required: true,
            },
            sessionEndedOn: {
                type: Date,
            },
            status: {
                type: Number,
                enum: SessionStatus,
                default: SessionStatus.ACTIVE,
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
