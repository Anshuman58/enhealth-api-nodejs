import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';
import { RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base';
import handleChatEvent from './socket_utils/handleChatEvent';
import handleConsultationEvent from './socket_utils/handleConsultationEvent';

export default function (app: Application): void {
    if (typeof app.channel !== 'function') {
        // If no real-time functionality has been configured just return
        return;
    }

    app.on('connection', (connection: any): void => {
        // On a new real-time connection, add it to the anonymous channel
        app.channel('anonymous').join(connection);
    });

    app.on('login', (authResult: any, { connection }: any): void => {
        // connection can be undefined if there is no
        // real-time connection, e.g. when logging in via REST
        if (connection) {
            // Obtain the logged in user from the connection
            // const user = connection.user;

            // The connection is no longer anonymous, remove it
            app.channel('anonymous').leave(connection);

            // Add it to the authenticated user channel
            app.channel('authenticated').join(connection);

            const userData = connection.user as any;
            if (userData) {
                const { _id: userId } = userData;
                app.channel(`userIds/${userId}`).join(connection);
            }
        }
    });

    app.on('disconnect', async (connection: RealTimeConnection): Promise<void> => {
        if (connection) {
            app.channel('authenticated').leave(connection);
            app.channel('anonymous').join(connection);

            const userData = connection.user as any;
            // console.log(userData);
            if (userData) {
                const { _id: userId } = userData;
                app.channel(`userIds/${userId}`).leave(connection);
            }
        }
    });

    app.service('v1/consultation-chat').publish('created', async (result, context) => {
        return handleChatEvent(result, context);
    });

    app.service('v1/consultation-chat').publish('removed', async (result, context) => {
        return handleChatEvent(result, context);
    });

    app.service('v1/consultation-booking').publish('patched', async (result, context) => {
        return handleConsultationEvent(result, context);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // app.publish((data: any, hook: HookContext) => {
    //     // Here you can add event publishers to channels set up in `channels.ts`
    //     // To publish only for a specific event use `app.publish(eventname, () => {})`
    //
    //     // console.log('Publishing all events to all authenticated users. See `channels.ts` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line
    //
    //     // e.g. to publish all service events to all authenticated users use
    //     return app.channel('authenticated');
    // });

    // Here you can also add service specific event publishers
    // e.g. the publish the `users` service `created` event to the `admins` channel
    // app.service('users').publish('created', () => app.channel('admins'));

    // With the userid and email organization from above you can easily select involved users
    // app.service('messages').publish(() => {
    //   return [
    //     app.channel(`userIds/${data.createdBy}`),
    //     app.channel(`emails/${data.recipientEmail}`)
    //   ];
    // });
}
