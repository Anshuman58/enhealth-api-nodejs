import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { disallow, keep } from 'feathers-hooks-common';
import Permit from '../../../hooks/Permit';
import UpdateAdminProfile from './hooks/UpdateAdminProfile';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [],
        find: [disallow()],
        get: [disallow()],
        create: [authenticate('jwt'), Permit.ADMIN, keep('name', 'gender', 'avatar'), UpdateAdminProfile()],
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
