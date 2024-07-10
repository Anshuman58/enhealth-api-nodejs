import * as authentication from '@feathersjs/authentication';
import FRequired from '../../../hooks/FRequired';
import { disallow, discard, iff } from 'feathers-hooks-common';
import hasData from '../../../utils/hasData';
import { Actions, AuthStrategies } from './interfaces/AuthenticationInterface';
import HandleAuthentication from './hooks/HandleAuthentication';
import HandleOTPVerification from './hooks/HandleOTPVerification';
import CreateUserSession from '../../../hooks/CreateUserSession';
import CustomProtectHook from '../../../hooks/CustomProtectHook';
import AttachProfileDetails from './hooks/AttachProfileDetails';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [],
        find: [disallow()],
        get: [disallow()],
        create: [
            FRequired(['strategy']),
            iff(
                hasData('strategy', AuthStrategies.PHONE_OTP, AuthStrategies.EMAIL_OTP),
                FRequired(['action']),
                discard('action'),
            ),
            iff(hasData('strategy', AuthStrategies.PHONE_OTP), FRequired(['phone', 'role'])),
            iff(hasData('strategy', AuthStrategies.EMAIL_OTP), FRequired(['email', 'role'])),
            iff(hasData('strategy', AuthStrategies.LOCAL), FRequired(['email', 'password', 'role'])),
            iff(
                hasData('strategy', AuthStrategies.GOOGLE, AuthStrategies.LINKEDIN),
                FRequired(['accessToken', 'role']),
            ),
            HandleAuthentication(),
        ],
        update: [disallow()],
        patch: [
            FRequired(['strategy', 'otp', 'role']),
            iff(hasData('strategy', AuthStrategies.PHONE_OTP, AuthStrategies.EMAIL_OTP)).else(disallow()),
            iff(hasData('strategy', AuthStrategies.PHONE_OTP), FRequired(['phone'])).else(discard('phone')),
            iff(
                hasData('strategy', AuthStrategies.EMAIL_OTP),
                FRequired(['email']),
                iff(
                    hasData(
                        'action',
                        Actions.VERIFICATION,
                        Actions.FORGOT_PASSWORD,
                        Actions.RESET_PASSWORD,
                        Actions.LOGIN,
                    ),
                ).else(disallow()),
            ).else(discard('email')),
            iff(hasData('action', Actions.VERIFICATION), authenticate('jwt')),
            HandleOTPVerification(),
        ],
        remove: [disallow()],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [AttachProfileDetails(), CreateUserSession()],
        update: [],
        patch: [AttachProfileDetails(), CreateUserSession()],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
