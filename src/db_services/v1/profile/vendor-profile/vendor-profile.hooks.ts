import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import SetDefaultItem from "../../../../hooks/SetDefaultItem";
import {disallow, iff, isProvider} from "feathers-hooks-common";
import {EntityStatus} from "../../../../constants/EntityStatus";
import PatchDeleted from "../../../../hooks/PatchDeleted";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

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
