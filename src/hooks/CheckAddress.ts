import { HookContext } from '@feathersjs/feathers';
import { Address } from '../global_interface/Address';
import { BadRequest } from '@feathersjs/errors';

const CheckAddress = () => async (context: HookContext) => {
    const { data, path } = context;

    const { address } = data;

    if (address) {
        const { addressLine1, city, state, pinCode, coordinates } = address as Address;
        if (!addressLine1 || !city || !state || !pinCode) {
            throw new BadRequest('Please provide complete address.');
        }
        if (path !== 'v1/order-management/manage-order') {
            if (!coordinates) {
                throw new BadRequest('Please provide complete address.');
            }
        }
    }
};

export default CheckAddress;
