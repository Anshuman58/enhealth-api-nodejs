import * as authentication from '@feathersjs/authentication';
import setQuery from '../../../../hooks/SetQuery';
import { EntityStatus } from '../../../../global_interface/Interface';
import Permit from '../../../../hooks/Permit';
import setCreatedBy from '../../../../hooks/SetCreatedBy';
import FRequired from '../../../../hooks/FRequired';
import { disallow, discard, iff, isProvider, keep } from 'feathers-hooks-common';
import SetDefaultItem from '../../../../hooks/SetDefaultItem';
import SetQuery from '../../../../hooks/SetQuery';
import patchDeleted from '../../../../hooks/PatchDeleted';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [],
        find: [setQuery('status', EntityStatus.ACTIVE)],
        get: [setQuery('status', EntityStatus.ACTIVE)],
        create: [
            authenticate('jwt'),
            Permit.or(Permit.SUPER_ADMIN, Permit.ADMIN),
            setCreatedBy('createdBy'),
            // FRequired(['name', 'attachment']),
            FRequired('name'),
            discard('status', 'productCount', 'orderCount'),
            SetDefaultItem('status', EntityStatus.ACTIVE),
        ],
        update: [disallow()],
        patch: [
            iff(isProvider('server')).else(
                authenticate('jwt'),
                Permit.or(Permit.SUPER_ADMIN, Permit.ADMIN),
                keep('name', 'attachment'),
                SetQuery('status', EntityStatus.ACTIVE),
            ),
        ],
        remove: [authenticate('jwt'), Permit.or(Permit.SUPER_ADMIN, Permit.ADMIN), patchDeleted()],
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
