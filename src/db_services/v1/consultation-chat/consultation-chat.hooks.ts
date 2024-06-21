import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import setCreatedBy from '../../../hooks/SetCreatedBy';
import Permit from '../../../hooks/Permit';
import { disallow, iff } from 'feathers-hooks-common';
import FRequired from '../../../hooks/FRequired';
import setDefaultItem from '../../../hooks/SetDefaultItem';
import { EntityStatus } from '../../../global_interface/Interface';
import SetCreatedByQuery from '../../../hooks/SetCreatedByQuery';
import SetQuery from '../../../hooks/SetQuery';
import PatchDeleted from '../../../hooks/PatchDeleted';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [
            iff(Permit.is(Permit.USER), SetCreatedByQuery('user')),
            iff(Permit.is(Permit.DOCTOR), SetCreatedByQuery('doctor')),

            SetQuery('status', EntityStatus.ACTIVE),
        ],
        get: [],
        create: [
            setCreatedBy('createdBy'),
            iff(Permit.is(Permit.USER), setCreatedBy('user'), FRequired('doctor')),
            iff(Permit.is(Permit.DOCTOR), setCreatedBy('doctor'), FRequired('user')),
            setDefaultItem('status', EntityStatus.ACTIVE),
        ],
        update: [disallow()],
        patch: [disallow()],
        remove: [
            iff(Permit.is(Permit.USER), SetCreatedByQuery('user')),
            iff(Permit.is(Permit.DOCTOR), SetCreatedByQuery('doctor')),

            PatchDeleted(),
        ],
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
