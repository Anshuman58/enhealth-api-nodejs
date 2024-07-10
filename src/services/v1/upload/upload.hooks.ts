import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import CheckFiles from './hooks/CheckFiles';
import { disallow, iff } from 'feathers-hooks-common';
import HasAccessToken from '../../../utils/hasAccessToken';
import setCreatedBy from '../../../hooks/SetCreatedBy';
import FRequired from '../../../hooks/FRequired';
import setDefaultItem from '../../../hooks/SetDefaultItem';
import { EntityStatus } from '../../../constants/EntityStatus';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [],
        find: [disallow()],
        get: [disallow()],
        create: [
            iff(HasAccessToken(), authenticate('jwt'), setCreatedBy('user')),
            FRequired(['purpose', 'fileType', 'files']),
            setDefaultItem('status', EntityStatus.ACTIVE),
            CheckFiles(),
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
