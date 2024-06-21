
import { Application } from '../declarations';
import { CronJob } from 'cron';

const RemoveAllExpiredOTP = async (app: Application) => {
    const job = new CronJob('0 */2 * * * *', async () => {
        const otpService = app.service('v1/otp');

        const otpRequests = await otpService
            ._find({
                query: {
                    expireOn: {
                        $lte: new Date(),
                    },
                    paginate: false,
                },
                paginate: false,
            })
            .then((res) => res.map((e: any) => e._id));

        if (otpRequests.length) {
            await otpService._remove(null, {
                query: {
                    _id: { $in: otpRequests },
                },
            });
        }
    });

    job.start();
};

export default RemoveAllExpiredOTP;
