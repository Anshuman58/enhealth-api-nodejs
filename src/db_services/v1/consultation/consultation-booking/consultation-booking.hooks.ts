import * as authentication from '@feathersjs/authentication';
import SetCreatedBy from '../../../../hooks/SetCreatedBy';
import FRequired from '../../../../hooks/FRequired';
import SetDefaultItem from '../../../../hooks/SetDefaultItem';
import { disallow, iff } from 'feathers-hooks-common';
import Permit from '../../../../hooks/Permit';
import setCreatedByQuery from '../../../../hooks/SetCreatedByQuery';
import setDefaultQuery from '../../../../hooks/SetDefaultQuery';
import { consultationBookingStatus } from './Interface/ConsultationookingInterface';
import PatchDeleted from '../../../../hooks/PatchDeleted';
import { consultationBookingPath } from '../../../../service_endpoints/services';
import GenerateCode from '../../../../hooks/GenerateCode';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
// 667710ec995e2771ce210614
export default {
    before: {
        all: [authenticate('jwt')],
        find: [
            iff(Permit.is(Permit.DOCTOR), setCreatedByQuery('doctor')),
            iff(Permit.is(Permit.VENDOR), setCreatedByQuery('vendor')),
            setDefaultQuery('status', {
                $ne: consultationBookingStatus.REMOVED,
            }),
        ],
        get: [
            iff(Permit.is(Permit.DOCTOR), setCreatedByQuery('doctor')),
            iff(Permit.is(Permit.VENDOR), setCreatedByQuery('vendor')),
        ],
        create: [
            iff(Permit.is(Permit.DOCTOR, Permit.VENDOR)).else(disallow()),
            SetCreatedBy('vendor'),
            FRequired('doctor'),
            GenerateCode(consultationBookingPath, 'CNT', 'code', 6),
            SetDefaultItem('status', consultationBookingStatus.INIT),
        ],
        update: [disallow()],
        patch: [Permit.or(Permit.VENDOR, Permit.DOCTOR)],
        remove: [Permit.or(Permit.VENDOR, Permit.DOCTOR), PatchDeleted()],
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
