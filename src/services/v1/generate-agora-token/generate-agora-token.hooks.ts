import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import FRequired from '../../../hooks/FRequired';
import { disallow, iff } from 'feathers-hooks-common';
import Permit from '../../../hooks/Permit';
import setCreatedBy from '../../../hooks/SetCreatedBy';
import ValidateBookingAndGenerateAgoraToken from './hooks/ValidateBookingAndGenerateAgoraToken';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [
            Permit.or(Permit.DOCTOR, Permit.USER, Permit.VENDOR),
            FRequired('bookingId'),
            iff(Permit.is(Permit.DOCTOR), setCreatedBy('doctor')),
            iff(Permit.is(Permit.VENDOR), setCreatedBy('vendor')),
            ValidateBookingAndGenerateAgoraToken(),
        ],
        update: [disallow()],
        patch: [disallow()],
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
