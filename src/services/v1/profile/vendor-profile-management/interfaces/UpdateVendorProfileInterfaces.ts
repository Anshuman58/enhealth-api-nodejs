import { UploadMediaAttachment } from '../../../../../global_interface/UploadMediaAttachment';
import { Address } from '../../../../../global_interface/Address';

export interface UpdateVendorProfileRequest {
    name?: string;
    email?: string;
    avatar?: UploadMediaAttachment;
    phone?: string;
    drugLicenseType?: string;
    drugLicense?: UploadMediaAttachment;
    wholesaleLicense?: UploadMediaAttachment;
    ownerIdProof?: UploadMediaAttachment;
    businessIdProof?: UploadMediaAttachment;
    addressProof?: Array<UploadMediaAttachment>;
    attachments?: Array<UploadMediaAttachment>;
    address?: Address;
    termsAndConditionAccepted?: boolean;
}
