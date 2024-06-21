import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import Permit from '../../../hooks/Permit';
import { disallow, keep } from 'feathers-hooks-common';
import UpdateUserProfile from './hooks/UpdateUserProfile';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [],
        find: [disallow()],
        get: [disallow()],
        /*Todo: Two separate hooks required for update user and admin profile(module access)*/
        create: [authenticate('jwt'), Permit.USER, keep('name', 'avatar', 'phone', 'gender'), UpdateUserProfile()],
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
