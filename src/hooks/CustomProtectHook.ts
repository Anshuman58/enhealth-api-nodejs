
import { HookContext } from '@feathersjs/feathers';

/**
 * Remove specified fields from the custom protect hook.
 * @param fieldNames - Field names which are to be removed from the response.
 */
const CustomProtectHook =
    (...fieldNames: Array<string>) =>
    async (context: HookContext) => {
        const { result } = context;

        const deleteFields = (obj: object) => {
            const modifyObject = (obj: object, keys: Array<string>): any => {
                // Type assertion for the object.
                type ObjectKey = keyof typeof obj;

                if (keys.length === 1) {
                    delete obj[keys[0] as ObjectKey];
                    return obj;
                }
                obj = modifyObject(obj[keys[0] as ObjectKey], keys.slice(1));
                return obj;
            };

            for (let i = 0; i < fieldNames.length; i++) {
                const nestedKeys = fieldNames[i].split('.');
                modifyObject(obj, nestedKeys);
            }
        };

        if (Array.isArray(result)) {
            if (result.length) {
                for (const each of result) {
                    deleteFields(each);
                }
            }
        } else if (typeof result.total !== 'undefined') {
            if (result.data) {
                for (const each of result.data) {
                    deleteFields(each);
                }
            }
        } else {
            deleteFields(result);
        }
    };

export default CustomProtectHook;
