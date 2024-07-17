import * as authentication from '@feathersjs/authentication';
import { disallow, iff } from 'feathers-hooks-common';
import Permit from '../../../../hooks/Permit';
import SetId from '../../../../hooks/SetId';
import SetCreatedByQuery from '../../../../hooks/SetCreatedByQuery';
import hasDataExists from '../../../../utils/hasDataExists';
import CheckAddress from '../../../../hooks/CheckAddress';
import GetDoctorDetails from './hooks/GetDoctorDetails';
import UpdateDoctorProfile from './hooks/UpdateDoctorProfile';
import UpdateDoctorConsultationFee from './hooks/UpdateDoctorConsultationFee';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [disallow()],
        get: [
            Permit.or(Permit.SUPER_ADMIN, Permit.ADMIN, Permit.DOCTOR),
            iff(Permit.is(Permit.DOCTOR), SetId()),
            GetDoctorDetails(),
        ],
        create: [disallow()],
        update: [disallow()],
        patch: [
            Permit.DOCTOR,
            SetCreatedByQuery('userId'),
            iff(hasDataExists('phone', 'averageRating', 'totalRatingCount'), disallow()),
            // CheckAddress(),
            UpdateDoctorProfile(),
            // UpdateDoctorConsultationFee(),
        ],
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
