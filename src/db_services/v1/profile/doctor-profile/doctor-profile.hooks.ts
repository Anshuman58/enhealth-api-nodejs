import { disallow, iff, isProvider } from 'feathers-hooks-common';
import SetDefaultItem from '../../../../hooks/SetDefaultItem';
import PatchDeleted from '../../../../hooks/PatchDeleted';
import { EntityStatus } from '../../../../constants/EntityStatus';
import * as local from '@feathersjs/authentication-local';

const { protect } = local.hooks;

export default {
    before: {
        all: [iff(isProvider('server')).else(disallow())],
        find: [],
        get: [],
        create: [SetDefaultItem('status', EntityStatus.ACTIVE)],
        update: [],
        patch: [],
        remove: [PatchDeleted()],
    },

    after: {
        all: [protect('metadata')],
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
