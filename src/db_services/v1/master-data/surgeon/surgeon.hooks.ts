// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import search from 'feathers-mongodb-fuzzy-search';
import * as authentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import SetQuery from '../../../../hooks/SetQuery';
import Permit from '../../../../hooks/Permit';
import SetCreatedBy from '../../../../hooks/SetCreatedBy';
import FRequired from '../../../../hooks/FRequired';
import { disallow, discard, iff, keep } from 'feathers-hooks-common';
import SetDefaultItem from '../../../../hooks/SetDefaultItem';
import PatchDeleted from '../../../../hooks/PatchDeleted';
import hasAccessToken from '../../../../utils/hasAccessToken';
import { EntityStatus } from '../../../../constants/EntityStatus';
import CheckDuplicateEntry from '../../../../hooks/CheckDuplicateEntry';
import { SurgeonDbOperations } from './utils/SurgeonDbOperations';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [
            SetQuery('status', EntityStatus.ACTIVE),
            search({
                fields: ['name'],
            }),
        ],
        get: [SetQuery('status', EntityStatus.ACTIVE)],
        create: [
            authenticate('jwt'),
            Permit.or(Permit.ADMIN),
            SetCreatedBy('createdBy'),
            FRequired(['name']),
            discard('status'),
            SetDefaultItem('status', EntityStatus.ACTIVE),
            CheckDuplicateEntry('name', SurgeonDbOperations._servicePath),
            // CheckDuplicateSurgeon(),
        ],
        update: [disallow()],
        patch: [
            authenticate('jwt'),
            Permit.or(Permit.ADMIN,),
            keep('name', 'attachments'),
            SetQuery('status', EntityStatus.ACTIVE),
            // CheckDuplicateSurgeon(),
            CheckDuplicateEntry('name', SurgeonDbOperations._servicePath),
        ],
        remove: [authenticate('jwt'), Permit.or(Permit.ADMIN), PatchDeleted()],
    },

    after: {
        all: [
            iff(
                hasAccessToken(),
                iff(Permit.is(Permit.ADMIN)).else(
                    protect('createdBy', 'status', 'createdAt', 'updatedAt', '__v'),
                ),
            ).else(protect('createdBy', 'status', 'createdAt', 'updatedAt', '__v')),
        ],
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
