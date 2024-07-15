// ../db_services/v1/consultation-booking-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../../../../declarations';
import { Model, Mongoose } from 'mongoose';
import { consultationBookingStatus, patientGender } from './Interface/ConsultationookingInterface';

export default function (app: Application): Model<any> {
    const modelName = 'consultationBooking';
    const mongooseClient: Mongoose = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema?.Types;
    const schema = new Schema(
        {
            doctor: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            vendor: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            patient: {
                name: {
                    type: String,
                },
                age: {
                    type: Number,
                },
                gender: {
                    type: Number,
                    enum: patientGender,
                },
                phone: {
                    type: String,
                },
                complaint: {
                    type: String,
                },
            },
            prescription: {
                link: {
                    type: String,
                },
                metadata: {
                    size: Number,
                },
            },
            status: {
                type: Number,
                enum: consultationBookingStatus,
                default: consultationBookingStatus.INIT,
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
