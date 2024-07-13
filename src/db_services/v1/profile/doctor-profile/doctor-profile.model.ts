// v1/doctor-profile-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { EntityStatus } from '../../../../constants/EntityStatus';
import { Application } from '../../../../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
    const modelName = 'doctorProfile';
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
            description: {
                type: String,
            },
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
            specialities: {
                type: [String],
            },
            symptomSpecializations: {
                type: [String],
            },
            surgeonSpecializations: {
                type: [String],
                default: undefined,
            },
            languages: {
                type: [String],
            },
            // hospitalName: {
            //     type: String,
            // },
            experiences: [
                {
                    from: {
                        type: Number,
                        required: true,
                    },
                    to: {
                        type: Number,
                        required: true,
                    },
                    role: {
                        type: String,
                        required: true,
                    },
                    hospital: {
                        type: String,
                        required: true,
                    },
                },
            ],
            educations: [
                {
                    school: {
                        type: String,
                        required: true,
                    },
                    qualification: {
                        type: String,
                        required: true,
                    },
                    year: {
                        type: Number,
                        required: true,
                    },
                },
            ],
            idProof: [
                {
                    link: {
                        type: String,
                    },
                    metadata: {
                        size: Number,
                    },
                },
            ],
            awards: [
                {
                    name: {
                        type: String,
                    },
                    year: {
                        type: Number,
                    },
                    attachment: {
                        link: {
                            type: String,
                        },
                        metadata: {
                            size: Number,
                        },
                    },
                },
            ],
            registrationCertificate: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            medicalLicense: {
                licenseAuthority: {
                    type: String,
                },
                licenseNumber: {
                    type: String,
                },
                licenseExpiration: {
                    type: Date,
                },
                attachment: {
                    link: {
                        type: String,
                    },
                    metadata: {
                        size: Number,
                    },
                },
            },
            clinicalEstablishmentCertificate: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            workPlaceId: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            status: {
                type: Number,
                enum: EntityStatus,
                default: EntityStatus.INACTIVE,
            },
            metadata: {
                type: String,
            },
            averageRating: {
                type: Number,
                default: 0,
            },
            termsAndConditionAccepted: {
                type: Boolean,
            },
            totalRatingCount: {
                type: Number,
                default: 0,
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
