// ../db_services/v1/consultation/doctor-consultation-fee-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { EntityStatus } from '../../../../constants/EntityStatus';

export default function (app: Application): Model<any> {
    const modelName = 'doctorConsultationFee';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema?.Types;
    const schema = new Schema(
        {
            doctorProfile: {
                type: ObjectId,
                ref: 'doctorProfile',
                required: true,
                index: true,
            },
            onlineConsultationFee: {
                type: Number,
                index: true,
            },
            clinicConsultationFee: {
                type: Number,
                index: true,
            },
            homeConsultationFee: {
                type: Number,
                index: true,
            },
            status: {
                type: Number,
                default: EntityStatus.ACTIVE,
                enum: EntityStatus,
                index: true,
            },
        },
        {
            timestamps: true,
        },
    );

    schema.index({
        doctorProfile: 1,
        status: 1,
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        (mongooseClient as any).deleteModel(modelName);
    }
    return mongooseClient.model<any>(modelName, schema);
}
