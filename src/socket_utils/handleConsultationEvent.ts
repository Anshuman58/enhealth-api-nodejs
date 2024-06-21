import { HookContext } from '@feathersjs/feathers';


const handleConsultationEvent = async (result: any, context: HookContext) => {
    const { app, data } = context;

    const { status } = data as any;
    const socketChannel: any = [];

    if ([2, 3, 4, 5].includes(status)) {
        const { user, vendor } = result;

        if (user) {
            const userId = 'name' in user ? user._id : user;
            socketChannel.push(app.channel(`userIds/${userId}`));
        }
        if (vendor) {
            const vendorId = 'name' in vendor ? vendor._id : vendor;
            socketChannel.push(app.channel(`userIds/${vendorId}`));
        }
        return socketChannel;
    }
};

export default handleConsultationEvent;
