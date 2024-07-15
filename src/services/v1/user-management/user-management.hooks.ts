import * as authentication from '@feathersjs/authentication';
import Permit from '../../../hooks/Permit';
import { disallow, discard, iff, keep } from 'feathers-hooks-common';
import setDefaultQuery from '../../../hooks/SetDefaultQuery';
import { UserStatus } from '../../../db_services/v1/user/interfaces/UserInterfaces';
import FRequired from '../../../hooks/FRequired';
import GenerateCode from '../../../hooks/GenerateCode';
import { userPath } from '../../../service_endpoints/services';
import setDefaultItem from '../../../hooks/SetDefaultItem';
import GenAccessToken from './hooks/GenAccessToken';
import HasAccessToken from '../../../utils/hasAccessToken';
import CheckEmailOrPhone from '../../../db_services/v1/user/hooks/CheckEmailOrPhone';
import hashPassword from '@feathersjs/authentication-local/lib/hooks/hash-password';
import HasDataExists from '../../../utils/hasDataExists';
import setCreatedBy from '../../../hooks/SetCreatedBy';
import ValidateRegistrationToken from '../../../db_services/v1/user/hooks/ValiidateRegistrationToken';
import CheckNullQuery from '../../../hooks/CheckNullQuery';

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [],
        find: [
            authenticate('jwt'),
            iff(
                Permit.is(Permit.SUPER_ADMIN),
                setDefaultQuery('status', {
                    $in: [UserStatus.ACTIVE, UserStatus.BLOCKED],
                }),
            ).else(setDefaultQuery('status', UserStatus.ACTIVE)),
            CheckNullQuery(['vendorProfile', 'doctorProfile']),
        ],
        get: [authenticate('jwt'), setDefaultQuery('status', { $ne: UserStatus.REMOVED })],
        create: [
            FRequired(['name', 'email', 'role']),
            iff(HasAccessToken(), authenticate('jwt')),
            // iff(HasData('role', UserRole.ADMIN, UserRole.USER)).else(disallow()),
            GenerateCode(userPath, '#', 'userId', 5),
            iff(HasDataExists('password'), hashPassword('password')),
            CheckEmailOrPhone(),
            ValidateRegistrationToken(),
            setDefaultItem('status', UserStatus.INACTIVE),
        ],
        update: [disallow()],
        patch: [
            authenticate('jwt'),
            Permit.SUPER_ADMIN,
            hashPassword('password'),
            keep('name', 'phone', 'email', 'status', 'password'),
            // setCreatedByQuery('createdBy'),
            discard('role'),
        ],
        remove: [authenticate('jwt'), Permit.SUPER_ADMIN],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [GenAccessToken()],
        update: [],
        patch: [],
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
