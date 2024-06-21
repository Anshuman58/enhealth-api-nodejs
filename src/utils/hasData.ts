
import { HookContext } from '@feathersjs/feathers';

/**
 *
 * @param name
 * @param values
 */
const hasData =
    (name: string, ...values: Array<any>) =>
    (context: HookContext): boolean => {
        const { data } = context;

        const value = data[name];

        return values.indexOf(value) >= 0;
    };

export default hasData;
