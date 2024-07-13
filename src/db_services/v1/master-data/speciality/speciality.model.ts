// ../db_services/v1/master-data/speciality-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { EntityStatus } from '../../../../constants/EntityStatus';

export default function (app: Application): Model<any> {
    const modelName = 'speciality';
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
            // surgeonIds: [
            //     {
            //         type: ObjectId,
            //         ref: 'surgeon',
            //     },
            // ],
            // symptomIds: [
            //     {
            //         type: ObjectId,
            //         ref: 'symptom',
            //     },
            // ],
            hidden: {
                type: Boolean,
                default: true,
            },
            // surgeonNames: {
            //     type: [String],
            //     default: undefined,
            // },
            // symptomNames: {
            //     type: [String],
            //     default: undefined,
            // },
            status: {
                type: Number,
                enum: [
                    EntityStatus.ACTIVE, // 1
                    EntityStatus.DELETED, // -1
                ],
                default: EntityStatus.ACTIVE,
            },
        },
        {
            timestamps: true,
        },
    );

    schema.index({
        name: 1,
        status: 1,
    });

    schema.index({
        status: 1,
    });

    schema.index({
        name: 'text',
    });

    // schema.index({
    //     name: 1,
    //     surgeonIds: 1,
    //     status: 1,
    // });
    //
    // schema.index({
    //     name: 1,
    //     symptomIds: 1,
    //     status: 1,
    // });
    //
    // schema.index({
    //     name: 1,
    //     surgeonIds: 1,
    //     symptomIds: 1,
    //     status: 1,
    // });
    //
    // schema.index({
    //     symptomIds: 1,
    //     status: 1,
    // });
    // schema.index({
    //     surgeonIds: 1,
    //     status: 1,
    // });
    //
    // schema.index({
    //     name: 1,
    //     surgeonNames: 1,
    //     status: 1,
    // });
    // schema.index({
    //     name: 1,
    //     symptomNames: 1,
    //     status: 1,
    // });
    // schema.index({
    //     name: 1,
    //     surgeonNames: 1,
    //     symptomNames: 1,
    //     status: 1,
    // });
    // schema.index({
    //     symptomNames: 1,
    //     status: 1,
    // });
    // schema.index({
    //     surgeonNames: 1,
    //     status: 1,
    // });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}
