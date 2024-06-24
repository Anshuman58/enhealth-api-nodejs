import { HookContext } from '@feathersjs/feathers';
import { AgoraToken_POST } from '../Interface/AgoraTokenInterface';
import { BadRequest, FeathersError } from '@feathersjs/errors';
import { RtcRole, RtcTokenBuilder } from 'agora-token';

const ValidateBookingAndGenerateAgoraToken = () => async (context: HookContext) => {
    const { app, params } = context;
    const { bookingId, user, doctor } = context.data as AgoraToken_POST;

    // const serviceDetails = await app
    //     .service(serviceBookingPath)
    //     .get(bookingId, {
    //         query: {
    //             ...params.query,
    //             user: user || { $ne: null },
    //             doctor: doctor || { $ne: null },
    //             status: bookingStatus.ONGOING,
    //             visitType: visitType.VIDEO_CALLING_CHAT,
    //         },
    //     })
    //     .catch((e: FeathersError) => {
    //         console.log(e);
    //         throw new BadRequest('Consultation can not be started');
    //     });
    const { appId, appCertificate } = app.get('agora');

    const uid = 'doctor' in context.data ? 1 : 2;
    const role = RtcRole.PUBLISHER;
    const totalMilliseconds = 0.5 * 60 * 60 * 1000;
    const expireTime = Math.floor(Date.now() / 1000) + Math.floor(totalMilliseconds / 1000);
    const channelName = 'channel_667710ec995e2771ce210614';

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
