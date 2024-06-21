import * as authentication from '@feathersjs/authentication';
import setQuery from '../../../../hooks/SetQuery';
import { EntityStatus } from '../../../../global_interface/Interface';
import Permit from '../../../../hooks/Permit';
import FRequired from '../../../../hooks/FRequired';
import setCreatedBy from '../../../../hooks/SetCreatedBy';
import setDefaultItem from '../../../../hooks/SetDefaultItem';
import { disallow, discard, keep } from 'feathers-hooks-common';
import patchDeleted from '../../../../hooks/PatchDeleted';
import ModuleValidateData from '../../../../hooks/ModuleValidateData';
import { productCategoryPath } from '../../../../service_endpoints/services';
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
            FRequired(['name', 'productCategory']),
            ModuleValidateData(productCategoryPath, 'productCategory', { status: EntityStatus.ACTIVE }),
            discard('status'),
            setDefaultItem('status', EntityStatus.ACTIVE),
        ],
        update: [disallow()],
        patch: [
            authenticate('jwt'),
            Permit.or(Permit.SUPER_ADMIN, Permit.ADMIN),
            // keep('name', 'productCategory'),
            ModuleValidateData(productCategoryPath, 'productCategory', { status: EntityStatus.ACTIVE }),
            // setQuery('status', EntityStatus.ACTIVE),
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
