import { HookContext } from '@feathersjs/feathers';
// import { ConsultationMessage_GET } from '../db_services/v1/consultation-message/Interface/ConsultationMessageInterface';

const handleChatEvent = async (result: any, context: HookContext) => {
    const { app } = context;

    const { user, doctor } = result;

    const socketChannel: any = [];

    if (user) {
        const userId = 'name' in user ? user._id : user;
        socketChannel.push(app.channel(`userIds/${userId}`));
    }
    if (doctor) {
        const doctorId = 'name' in doctor ? doctor._id : doctor;
        socketChannel.push(app.channel(`userIds/${doctorId}`));
    }

    return socketChannel;
};

export default handleChatEvent;
