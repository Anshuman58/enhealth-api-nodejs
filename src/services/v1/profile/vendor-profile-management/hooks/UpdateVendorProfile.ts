import { HookContext } from '@feathersjs/feathers';
import { UpdateVendorProfileRequest } from '../interfaces/UpdateVendorProfileInterfaces';
import { User_PATCH } from '../../../../../db_services/v1/user/interfaces/UserInterfaces';
import { VendorProfile_PATCH } from '../../../../../db_services/v1/profile/vendor-profile/Interface/VendorProfileInterfaces';
import { userPath, vendorProfilePath } from '../../../../../service_endpoints/services';
import { FeathersError } from '@feathersjs/errors';
import { EntityStatus } from '../../../../../global_interface/Interface';

const UpdateVendorProfile = () => async (context: HookContext) => {
    const { params, data, app } = context;

    const { query } = params;

    if (!query) return context;

    const { userId } = query;

    const {
        name,
        avatar,
        addressProof,
        attachments,
        address,
        ownerIdProof,
        businessIdProof,
        drugLicenseType,
        drugLicense,
        wholesaleLicense,
        termsAndConditionAccepted,
    } = data as UpdateVendorProfileRequest;

    const userPatchData: User_PATCH = {};

    if (name) userPatchData.name = name;
    if (avatar) userPatchData.avatar = avatar;

    const vendorProfilePatchData: VendorProfile_PATCH = {};
    if (ownerIdProof) vendorProfilePatchData.ownerIdProof = ownerIdProof;
    if (businessIdProof) vendorProfilePatchData.businessIdProof = businessIdProof;
    if (addressProof) vendorProfilePatchData.addressProof = addressProof;
    if (drugLicense) vendorProfilePatchData.drugLicense = drugLicense;
    if (attachments) vendorProfilePatchData.attachments = attachments;
    if (address) vendorProfilePatchData.address = address;
    if (drugLicenseType) vendorProfilePatchData.drugLicenseType = drugLicenseType;
    if (wholesaleLicense) vendorProfilePatchData.wholesaleLicense = wholesaleLicense;
    if (termsAndConditionAccepted) vendorProfilePatchData.termsAndConditionAccepted = termsAndConditionAccepted;

    let response = {};

    // Update the user data for any modification request

    if (Object.keys(userPatchData).length) {
        const userPatchResponse = await app
            .service(userPath)
            .patch(userId.toString(), userPatchData, {
                provider: 'server',
            })
            .catch((e: FeathersError) => {
                throw e;
            });

        response = {
            ...userPatchResponse,
        };
    } else {
        response = {
            ...params.user,
        };
    }

    //Get profile details

    let vendorProfileDetails = await app
        .service(vendorProfilePath)
        .find({
            query: {
                user: userId,
                status: EntityStatus.ACTIVE,
                $select: [
                    'addressProof',
                    'attachments',
                    'address',
                    'ownerIdProof',
                    'businessIdProof',
                    'drugLicense',
                    'drugLicenseType',
                    'wholesaleLicense',
                    'termsAndConditionAccepted',
                ],
            },
            provider: 'server',
        })
        .then((res: any) => (res.total ? res.data[0] : null));

    if (!vendorProfileDetails) {
        vendorProfileDetails = await app
            .service(vendorProfilePath)
            .create(
                {
                    user: userId,
                },
                {
                    query: {
                        $select: [
                            'addressProof',
                            'attachments',
                            'address',
                            'ownerIdProof',
                            'businessIdProof',
                            'drugLicense',
                            'drugLicenseType',
                            'wholesaleLicense',
                            'termsAndConditionAccepted',
                        ],
                    },
                    provider: 'server',
                },
            )
            .catch((e: FeathersError) => {
                throw e;
            });

        await app.service(userPath)._patch(userId, {
            vendorProfile: vendorProfileDetails._id,
        });
    }

    if (Object.keys(vendorProfilePatchData).length) {
        if (
            typeof vendorProfilePatchData.termsAndConditionAccepted !== 'undefined' &&
            typeof vendorProfileDetails.termsAndConditionAccepted !== 'undefined'
        ) {
            vendorProfilePatchData.termsAndConditionAccepted = undefined;
        }

        const vendorProfilePatchResponse = await app
            .service(vendorProfilePath)
            .patch(vendorProfileDetails._id.toString(), vendorProfilePatchData, {
                query: {
                    status: EntityStatus.ACTIVE,
                    $select: [
                        'addressProof',
                        'attachments',
                        'address',
                        'ownerIdProof',
                        'businessIdProof',
                        'drugLicense',
                        'drugLicenseType',
                        'wholesaleLicense',
                        'termsAndConditionAccepted',
                    ],
                },
                provider: 'server',
            })
            .catch((err: FeathersError) => {
                throw err;
            });
        response = {
            ...response,
            profile: vendorProfilePatchResponse,
        };
    } else {
        // If not attach profile details in response.

        response = {
            ...response,
            profile: vendorProfileDetails,
        };
    }

    context.result = response;
};

export default UpdateVendorProfile;
