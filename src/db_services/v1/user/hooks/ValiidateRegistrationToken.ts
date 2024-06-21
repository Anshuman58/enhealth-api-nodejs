import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import moment from 'moment';
import { OTPHelper } from '../../../../utils/AuthHelper/OTPHelper';
/**  * @description validate registration token and store phone number.
 * * @constructor  */
const ValidateRegistrationToken = () => async (context: HookContext) => {
    const { data, app } = context;

    const { registrationToken } = data;

    if (registrationToken) {
        const service = app.service('v1/otp');

        const utils = app.get('utils');
        const storedData = await service
            ._find({ query: { token: registrationToken, $limit: 1, purpose: 'login' } })
            .then((res: any) => (res.total ? res.data[0] : null));

        if (!storedData) {
            throw new BadRequest('Sign up operation timed out.');
        } else {
            const { expireOn, phone, email } = storedData;
            await OTPHelper.removeOtp(storedData._id.toString());

            if (!moment().isSameOrBefore(moment(expireOn))) {
                throw new BadRequest('Sign up operation timed out.');
            } else {
                data.phone = phone;
            }
        }
    }
};
export default ValidateRegistrationToken;
