import { Types } from 'mongoose';
import { User_GET } from '../../../user/interfaces/UserInterfaces';
import { EntityStatus } from '../../../../../global_interface/Interface';

export interface ProductCategory_GET {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId | User_GET;
    name: string;
    attachment: {
        link: string;
        thumbnail: string;
        metadata: number;
    };
    productCount: number;
    orderCount: number;
    status: EntityStatus;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface ProductCategory_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<ProductCategory_GET>;
}

export interface ProductCategory_CREATE {
    createdBy: Types.ObjectId;
    name: string;
    attachment: {
        link: string;
        thumbnail: string;
        metadata: number;
    };
    status?: EntityStatus;
}

export interface ProductCategory_PATCH {
    name?: string;
    attachment?: {
        link: string;
        thumbnail: string;
        metadata: number;
    };
    productCount?: number;
    orderCount?: number;
    status?: EntityStatus;
}


