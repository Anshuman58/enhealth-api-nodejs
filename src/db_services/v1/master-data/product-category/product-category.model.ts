// ../db_services/v1/master-data/product-category-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { EntityStatus } from '../../../../global_interface/Interface';

export default function (app: Application): Model<any> {
    const modelName = 'productCategory';
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
            attachment: {
                link: {
                    type: String,
                },
                thumbnail: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },

            productCount: {
                type: Number,
                default: 0,
            },
            orderCount: {
                type: Number,
                default: 0,
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
