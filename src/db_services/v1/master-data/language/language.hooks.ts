// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import search from 'feathers-mongodb-fuzzy-search';
import * as authentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import SetQuery from '../../../../hooks/SetQuery';
import { LanguageStatus } from './interfaces/LanguageInterfaces';
import Permit from '../../../../hooks/Permit';
import SetCreatedBy from '../../../../hooks/SetCreatedBy';
import FRequired from '../../../../hooks/FRequired';
import { disallow, discard, iff, keep } from 'feathers-hooks-common';
import SetDefaultItem from '../../../../hooks/SetDefaultItem';
import PatchDeleted from '../../../../hooks/PatchDeleted';
import hasAccessToken from '../../../../utils/hasAccessToken';
import CheckDuplicateEntry from '../../../../hooks/CheckDuplicateEntry';
import { LanguageDbOperations } from './utils/LanguageDbOperations';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const { protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [
            SetQuery('status', LanguageStatus.ACTIVE),
            search({
                fields: ['name'],
            }),
        ],
        get: [SetQuery('status', LanguageStatus.ACTIVE)],
        create: [
            authenticate('jwt'),
            Permit.or(Permit.ADMIN),
            SetCreatedBy('createdBy'),
            FRequired(['name']),
            discard('status'),
            SetDefaultItem('status', LanguageStatus.ACTIVE),
            CheckDuplicateEntry('name', LanguageDbOperations._servicePath),
            // CheckDuplicateLanguage(),
        ],
        update: [disallow()],
        patch: [
            authenticate('jwt'),
            Permit.or(Permit.ADMIN),
            keep('name'),
            SetQuery('status', LanguageStatus.ACTIVE),
            // CheckDuplicateLanguage(),
            CheckDuplicateEntry('name', LanguageDbOperations._servicePath),
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
