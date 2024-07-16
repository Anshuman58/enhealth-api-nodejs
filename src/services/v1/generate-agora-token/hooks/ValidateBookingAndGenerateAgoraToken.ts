import { HookContext } from '@feathersjs/feathers';
import { AgoraToken_POST } from '../Interface/AgoraTokenInterface';
import { BadRequest, FeathersError } from '@feathersjs/errors';
import { RtcRole, RtcTokenBuilder } from 'agora-token';
import { consultationBookingPath } from '../../../../service_endpoints/services';
import { consultationBookingStatus } from '../../../../db_services/v1/consultation/consultation-booking/Interface/ConsultationookingInterface';

const ValidateBookingAndGenerateAgoraToken = () => async (context: HookContext) => {
    const { app, params } = context;
    const { bookingId, doctor } = context.data as AgoraToken_POST;

    const serviceDetails = await app
        .service(consultationBookingPath)
        ._get(bookingId, {
            query: {
                ...params.query,
                doctor: doctor || { $ne: null },
                status: consultationBookingStatus.STARTED,
            },
        })
        .catch((e: FeathersError) => {
            console.log(e);
            throw new BadRequest('Consultation can not be started');
        });
    const { appId, appCertificate } = app.get('agora');

    const uid = 'doctor' in context.data ? 1 : 2;
    const role = RtcRole.PUBLISHER;
    const totalMilliseconds = 0.5 * 60 * 60 * 1000;
    const expireTime = Math.floor(Date.now() / 1000) + Math.floor(totalMilliseconds / 1000);
    const channelName = `channel_${serviceDetails._id}`;

    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        role,
        expireTime,
        expireTime,
    );

    context.result = {
        channelName,
        uid,
        token,
    };
};

export default ValidateBookingAndGenerateAgoraToken;
