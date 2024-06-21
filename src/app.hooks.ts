// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

import { iff, isProvider } from 'feathers-hooks-common';
import hasAccessToken from './utils/hasAccessToken';
import * as authentication from '@feathersjs/authentication';
import CheckIdRequiredForRemoveMethod from './hooks/CheckIdRequiredForRemoveMethod';

const { authenticate } = authentication.hooks;

export default {
    before: {
        all: [
            /*iff(hasAccessToken(), authenticate('jwt'))*/
        ],
        find: [
            iff(isProvider('external'), (ctx) => {
                const { params } = ctx;
                const { query } = params;
                let $limit = null;
                $limit = query?.$limit;
                if ($limit && typeof $limit === 'string') $limit = parseInt($limit);
                if ($limit === -1) {
                    delete ctx.params.query?.$limit;
                    ctx.params.paginate = false;
                }
            }),
        ],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [CheckIdRequiredForRemoveMethod()],
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
