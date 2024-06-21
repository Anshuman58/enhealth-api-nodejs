// ../db_services/v1/product-details-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { Gender } from './Interface/ProductDetailsInterface';

export default function (app: Application): Model<any> {
    const modelName = 'productDetails';
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
            productCategory: {
                type: ObjectId,
                ref: 'productCategory',
                required: true,
            },
            productSubCategory: [
                {
                    type: ObjectId,
                    ref: 'productSubCategory',
                    required: true,
                },
            ],
            attachments: [
                {
                    link: {
                        type: String,
                    },
                    thumbnail: {
                        type: String,
                    },
                    metadata: {
                        size: {
                            type: Number,
                        },
                    },
                },
            ],

            packaging: {
                type: String,
                required: true,
            },
            symptoms: {
                type: [String],
                required: true,
            },

            gender: {
                type: [Number],
                enum: Gender,
                required: true,
            },
            orderCount: {
                type: Number,
                default:0
            },
            totalRatings: {
                type: Number,
                default: 0,
            },
            averageRating: {
                type: Number,
                default: 0,
            },
            originalPrice: {
                type: Number,
                required: true,
            },
            sellingPrice: {
                type: Number,
                required: true,
            },
            prescriptionNeeded: {
                type: Boolean,
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
