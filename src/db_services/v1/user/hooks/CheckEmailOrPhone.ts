
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Users } from '../interfaces/UserResponseInterfaces';
import { UserDatum } from '../interfaces/UserRequestInterfaces';

/**
 * @description check if email exists in system or not.
 * @constructor
 */
const CheckEmailOrPhone =
    () =>
    async (context: HookContext): Promise<HookContext> => {
        const { data, app, id } = context;

        const userRequestData = data as UserDatum;

        const userEmail = userRequestData.email;

        const userPhone = userRequestData?.phone;

        const service = app.service('v1/user');

        const userId = id || null;

        if (userEmail) {
            if (userEmail.toString().trim() === '') throw new BadRequest('Invalid Email ID.');

            if (
                !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    userEmail,
                )
            ) {
                throw new BadRequest('Please provide a valid email!');
            }

            let query = {
                email: userEmail,
                status: { $ne: -1 },
                id: { $ne: userId },
            };

            if (id) {
                query = {
                    ...query,
                    id: { $ne: userId },
                };
            }

            const userData = await service
                ._find({
                    query,
                })
                .then((res: Users) => (res.total === 1 ? res.data : null));

            // console.log(userData);
            if (userData) throw new BadRequest('Email value already exists.');
        }

        if (userPhone) {
            if (userPhone.toString().trim() === '') throw new BadRequest('Invalid Phone Number.');

            if (!/^(([0-9 +_\-,.^*?$^#()])|(ext|x)){1,20}$/.test(userPhone)) {
                throw new BadRequest('Please provide a valid phone number!');
            }

            let query = {
                phone: userPhone,
                status: { $ne: -1 },
                id: { $ne: userId },
            };

            if (id) {
                query = {
                    ...query,
                    id: { $ne: userId },
                };
            }

            const userData = await service
                ._find({
                    query,
                })
                .then((res: Users) => (res.total === 1 ? res.data : null));

            // console.log(userData);
            if (userData) throw new BadRequest('Phone number already exists.');
        }

        return context;
    };

export default CheckEmailOrPhone;
