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
import CheckDuplicateSpeciality from './hooks/CheckDuplicateSpeciality';
import ModuleValidateData from '../../../../hooks/ModuleValidateData';
import { surgeonPath, symptomPath } from '../../../../service_endpoints/services';
import AttachNamesOfSurgeonsAndSymptoms from './hooks/AttachNamesOfSurgeonsAndSymptoms';
import hasData from '../../../../utils/hasData';
import CheckDuplicateEntry from '../../../../hooks/CheckDuplicateEntry';
import { SpecialityDbOperations } from './utils/SpecialityDbOperations';
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
            SetDefaultItem('hidden', true),
            // iff(hasData('hidden', false), FRequired(['attachments'])),
            discard('status'),
            SetDefaultItem('status', EntityStatus.ACTIVE),
            // CheckDuplicateSpeciality(),
            ModuleValidateData(surgeonPath, 'surgeonIds', { status: EntityStatus.ACTIVE }),
            ModuleValidateData(symptomPath, 'symptomIds', { status: EntityStatus.ACTIVE }),
            AttachNamesOfSurgeonsAndSymptoms(),
            CheckDuplicateEntry('name', SpecialityDbOperations._servicePath),
        ],
        update: [disallow()],
        patch: [
            authenticate('jwt'),
            Permit.or(Permit.ADMIN),
            keep('name', 'attachments', 'surgeonIds', 'symptomIds'),
            SetQuery('status', EntityStatus.ACTIVE),
            // CheckDuplicateSpeciality(),
            CheckDuplicateEntry('name', SpecialityDbOperations._servicePath),
            AttachNamesOfSurgeonsAndSymptoms(),
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
