import { BadRequest } from '@feathersjs/errors';
import { HookContext, ServiceAddons } from '@feathersjs/feathers';
import { Service } from 'feathers-mongoose';
import { EntityStatus } from '../constants/EntityStatus';

const CheckDuplicateEntry =
    (fieldName: string, serviceName: string, query?: Record<string, any>) => async (context: HookContext) => {
        const { data, id, app } = context;

        const service: Service & ServiceAddons<any> = app.service(serviceName);

        if (Array.isArray(data)) {
            // Check for duplicate values given in request.
            const values = data.map((e) => e[fieldName].toString().trim());
            let duplicateIndex: number | undefined;
            const hasDuplicate = values.some((e, i, self) => {
                if (self.indexOf(e) !== i) {
                    duplicateIndex = i;
                    return true;
                } else {
                    return false;
                }
            });
            if (hasDuplicate && typeof duplicateIndex !== 'undefined') {
                throw new BadRequest(`Duplicate value given in request for ${values[duplicateIndex]}`);
            }

            const entityExists = await service
                ._find({
                    query: {
                        ...query,
                        status: {
                            $ne: EntityStatus.DELETED,
                        },
                        [fieldName]: {
                            $in: values.map((e) => RegExp(`${e.trim()}`, 'i')),
                        },
                        $limit: 1,
                    },
                })
                .then((res) => (res.total ? res.data[0] : null));

            if (entityExists) {
                throw new BadRequest(`Value already exists with name ${entityExists[fieldName]}`);
            }

            context.data = data.map((e) => {
                return {
                    ...e,
                    [fieldName]: e[fieldName].toString().trim(),
                };
            });
        } else {
            const value = data[fieldName];
            if (!value) return context;
            const entityExists = await service
                ._find({
                    query: {
                        ...query,
                        _id: id
                            ? {
                                  $ne: id,
                              }
                            : {
                                  $ne: null,
                              },
                        status: {
                            $ne: EntityStatus.DELETED,
                        },
                        [fieldName]: RegExp(`${value.trim()}`, 'i'),
                        $limit: 1,
                    },
                })
                .then((res) => (res.total ? res.data[0] : null));

            if (entityExists) throw new BadRequest(`Value already exists with name ${entityExists[fieldName]}`);

            data[fieldName] = data[fieldName].trim();
        }
    };

export default CheckDuplicateEntry;
