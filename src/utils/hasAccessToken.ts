

import { HookContext } from '@feathersjs/feathers';

/**
 *
 * @return {function(*): boolean}
 * @constructor
 */
const hasAccessToken = () => (context: HookContext) => {
    const { params } = context;

    const { authentication } = params;

    return authentication !== undefined;
};

export default hasAccessToken;
