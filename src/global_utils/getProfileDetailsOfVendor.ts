import { UserRole, UserStatus } from '../db_services/v1/user/interfaces/UserInterfaces';
import { Types } from 'mongoose';
import { BadRequest } from '@feathersjs/errors';
import { EntityStatus } from '../constants/EntityStatus';
import { HookContext } from '@feathersjs/feathers';
import { userPath } from '../service_endpoints/services';

const getProfileDetailsOfVendor = async (userId: string, context: HookContext): Promise<any> => {
    const { app } = context;
    const userQuery: any = {
        _id: new Types.ObjectId(userId),
        status: {
            $ne: UserStatus.REMOVED,
        },
        role: UserRole.VENDOR,
    };
    const userDetails = await app.service(userPath).Model.aggregate([
        {
            $match: userQuery,
        },
        {
            $lookup: {
                from: 'vendorprofiles',
                let: { userId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$user', '$$userId'] },
                            status: EntityStatus.ACTIVE,
                        },
                    },
                    {
                        $project: {
                            drugLicenseType: 1,
                            drugLicense: 1,
                            wholesaleLicense: 1,
                            address: 1,
                            ownerIdProof: 1,
                            businessIdProof: 1,
                            addressProof: 1,
                            attachments: 1,
                            termsAndConditionAccepted: 1,
                        },
                    },
                ],
                as: 'profile',
            },
        },
        {
            $unwind: { path: '$profile', preserveNullAndEmptyArrays: true },
        },
    ]);

    if (!userDetails.length) {
        throw new BadRequest('Vendor data not found.');
    }

    if (!userDetails[0].profile) userDetails[0].profile = null;
    return userDetails[0];
};

export default getProfileDetailsOfVendor;
