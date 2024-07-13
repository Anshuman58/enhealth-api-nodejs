// ../db_services/v1/profile/vendor-profile-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { EntityStatus } from '../../../../constants/EntityStatus';

export default function (app: Application): Model<any> {
    const modelName = 'vendorProfile';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            user: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            drugLicense: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            wholesaleLicense: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            drugLicenseType: {
                type: String,
            },
            ownerIdProof: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            businessIdProof: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            addressProof: [
                {
                    link: {
                        type: String,
                    },
                    metadata: {
                        size: Number,
                    },
                },
            ],
            address: {
                addressLine1: {
                    type: String,
                },
                addressLine2: {
                    type: String,
                },
                landmark: {
                    type: String,
                },
                city: {
                    type: String,
                },
                state: {
                    type: String,
                },
                pinCode: {
                    type: String,
                },
                coordinates: {
                    type: [Number],
                    default: undefined,
                },
            },
            attachments: [
                {
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
            ],
            status: {
                type: Number,
                enum: EntityStatus,
                default: EntityStatus.INACTIVE,
            },
            termsAndConditionAccepted: {
                type: Boolean,
            },
            averageRating: {
                type: Number,
                default: 0,
            },
            totalRatingCount: {
                type: Number,
                default: 0,
            },
            bookingCount: {
                type: Number,
                default: 0,
            },
        },
        {
            timestamps: true,
        },
    );

    schema.index({
        'address.coordinates': '2dsphere',
    });

    schema.index({
        'address.coordinates': '2dsphere',
        status: 1,
    });

    schema.index({
        user: 1,
        status: 1,
    });

    schema.index({
        status: 1,
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}
