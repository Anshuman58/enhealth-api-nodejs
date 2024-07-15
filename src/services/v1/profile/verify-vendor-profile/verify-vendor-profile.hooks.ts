import * as authentication from '@feathersjs/authentication';
import Permit from '../../../../hooks/Permit';
import { disallow } from 'feathers-hooks-common';
import FRequired from '../../../../hooks/FRequired';
import VerifyVendor from './hooks/VerifyVendor';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt'), Permit.or(Permit.ADMIN, Permit.SUPER_ADMIN)],
        find: [disallow()],
        get: [disallow()],
        create: [FRequired(['id']), VerifyVendor()],
        update: [disallow()],
        patch: [disallow()],
        remove: [disallow()],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
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
