import { Types } from 'mongoose';
import { ProductCategory_GET } from '../../product-category/Interface/ProductCategoryInterface';
import { EntityStatus } from '../../../../../global_interface/Interface';
import { User_GET } from '../../../user/interfaces/UserInterfaces';

export interface ProductSubCategory_CREATE {
    createdBy: Types.ObjectId;
    name: string;
    productCategory: Types.ObjectId | ProductCategory_GET;
    status?: EntityStatus;
}

export interface ProductSubCategory_GET {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId | User_GET;
    name: string;
    productCategory: Types.ObjectId | ProductCategory_GET;
    status: EntityStatus;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface ProductSubCategory_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<ProductSubCategory_GET>;
}

export interface ProductSubCategory_PATCH {
    name: string;
    productCategory: Types.ObjectId | ProductCategory_GET;
    status: EntityStatus;
}
