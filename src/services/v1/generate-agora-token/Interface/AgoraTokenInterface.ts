import { Types } from 'mongoose';

export interface AgoraToken_POST {
    bookingId: Types.ObjectId;
    doctor?: Types.ObjectId;
    user?: Types.ObjectId;
}
