import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { disallow, discard, iff } from 'feathers-hooks-common';
import Permit from '../../../../hooks/Permit';
import setId from '../../../../hooks/SetId';
import SetCreatedByQuery from '../../../../hooks/SetCreatedByQuery';
import hasDataExists from '../../../../utils/hasDataExists';
import GetVendorDetails from './hooks/GetVendorDetails';
import UpdateVendorProfile from './hooks/UpdateVendorProfile';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [disallow()],
        get: [
            Permit.or(Permit.SUPER_ADMIN, Permit.ADMIN, Permit.VENDOR),
            iff(Permit.is(Permit.VENDOR), setId()),
            GetVendorDetails(),
        ],
        create: [disallow()],
        update: [disallow()],
        patch: [
            Permit.VENDOR,
            SetCreatedByQuery('userId'),
            iff(hasDataExists('phone', 'email', 'password'), disallow()),
            UpdateVendorProfile(),
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
