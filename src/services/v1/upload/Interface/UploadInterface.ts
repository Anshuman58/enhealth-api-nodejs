import { Types } from 'mongoose';

export enum FilePurpose {
    PROFILE = 'profile',
    PRESCRIPTION = 'prescription',
    HEALTH_RECORD = 'userHealthRecord',
    SURGEON = 'surgeon',
    SYMPTOM = 'symptom',
    SPECIALITY = 'speciality',
    TEST_CATEGORY = 'testCategory',
    TEST = 'test',
    TEST_PACKAGE = 'testPackage',
    MANUFACTURER = 'manufacturer',
    PRODUCT_CATEGORY = 'productCategory',
    MEDICINE_CATEGORY = 'medicineCategory',
    BLOG = 'blog',
    VIDEO = 'video',
    COUPON = 'coupon',
    SAFETY_PARAMETER = 'safetyParameter',
    MEDICINE_DETAILS = 'medicineDetails',
    PRODUCT_DETAILS = 'productDetails',
    REDEEM_REQUEST = 'redeemRequest',
    MEDICINE_CLASS = 'medicineClass',
    MEDICINE_RATING = 'medicineRating',
    PRODUCT_RATING = 'productRating',
    CART_ITEM = 'cartItem',
    OTHERS = 'others',
}

export enum FileType {
    IMAGE = 1,
    VIDEO = 2,
    AUDIO = 3,
    DOCUMENT = 4,
}

export interface upload_POST {
    user?: Types.ObjectId;
    purpose: FilePurpose;
    fileType: FileType;
    thumbnail?: string;
    link: string;
    metadata?: {
        size?: number;
        duration?: number;
    };
}
