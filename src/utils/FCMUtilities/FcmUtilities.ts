import firebaseAdmin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/lib/messaging';
import { Application } from '../../declarations';
import { Unavailable } from '@feathersjs/errors';
import { FCMConfig } from './FCMInterfaces';

/**
 *
 * Implements the FCM initialization procedure, send notification to
 * multiple device features.
 *
 */
export class FcmUtilities {
    /**
     * Initialize Firebase Messaging with the available FCM credentials.
     * The required configurations should be set in default.json with
     * fields projectId, clientEmail, privateKey
     *
     * @param app - The application object provided by feathers.
     *
     */
    static initializeFirebase(app: Application): void {
        const fcmConfig: FCMConfig = app.get('fcm');
        if (!fcmConfig)
            throw new Unavailable('Please provide FCM configuration configuration as mentioned in documentation.');

        const { projectId, clientEmail, privateKey } = fcmConfig;
        if (!projectId || !clientEmail || !privateKey)
            throw new Unavailable('Please provide all the required configuration values for FCM.');

        if (!firebaseAdmin.apps.length) {
            firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
            });
        }
    }

    /**
     * This function is used to send notification with required data
     * to the provided FCM tokens.
     *
     * @remarks
     *
     * Send notification to multiple devices.
     *
     * @param title - Title of the notification.
     * @param body - Body/Content of the notification.
     * @param data - Payload to be attached with the notification.
     * @param fcmIds - FCM tokens of the device to which the notification will be sent.
     * @param image - Image url( if any ) to be displayed in the notification.
     */
    static async sendNotifications(
        title: string,
        body: string,
        data: any,
        fcmIds: Array<string>,
        image = '',
    ): Promise<void> {
        Object.keys(data).forEach((e) => {
            data[e] = data[e].toString();
        });

        const iterationCount = fcmIds.length / 500 + 1; // As fcm can send only 500 registration tokens at a time.

        for (let i = 1; i <= iterationCount; i++) {
            const tokens = fcmIds.splice((i - 1) * 500, i * 500);

            const message: MulticastMessage = {
                notification: {
                    title,
                    body,
                    imageUrl: image === '' ? undefined : image,
                },
                android: {
                    notification: {
                        clickAction: 'FLUTTER_NOTIFICATION_CLICK',
                        defaultSound: true,
                        priority: 'high',
                        lightSettings: {
                            color: '#BF13BF',
                            lightOffDurationMillis: 1000,
                            lightOnDurationMillis: 1000,
                        },
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: {
                                critical: false,
                                name: 'default',
                                volume: 1.0,
                            },
                        },
                    },
                },
                data,
                tokens: tokens,
            };

            // console.log(message);
            await firebaseAdmin
                .messaging()
                .sendMulticast(message)
                .catch((e) => {
                    // console.error(e);
                    return e;
                });
        }
    }
}
