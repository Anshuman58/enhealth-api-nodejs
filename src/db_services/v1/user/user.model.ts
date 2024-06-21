// v1/user-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { UserGender, UserRole, UserStatus } from './interfaces/UserInterfaces';

export default function (app: Application): Model<any> {
    const modelName = 'user';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema?.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                ref: 'user',
            },
            name: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
            },
            avatar: {
                type: String,
            },
            email: {
                type: String,
                lowercase: true,
            },
            password: {
                type: String,
            },
            userId: {
                type: String,
            },
            gender: {
                type: Number,
                enum: UserGender,
            },
            role: {
                type: Number,
                enum: UserRole,
                required: true,
            },
            address: {
                type: String,
            },
            socialLogin: {
                type: Boolean,
                default: false,
            },
            status: {
                type: Number,
                enum: UserStatus,
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
