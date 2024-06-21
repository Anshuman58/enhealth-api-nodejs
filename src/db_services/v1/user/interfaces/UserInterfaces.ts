import { Types } from 'mongoose';
import { HookContext, Service } from '@feathersjs/feathers';

export enum UserRole {
    SUPER_ADMIN = 1,
    ADMIN = 2,
    USER = 3,
    DOCTOR = 4,
    VENDOR = 5,
}

export enum UserStatus {
    ACTIVE = 1,
    BLOCKED = 0,
    REMOVED = -1,
}

export enum UserGender {
    MALE = 1,
    FEMALE = 2,
    OTHERS = 3,
}

export interface User_GET {
    _id: Types.ObjectId;
    name: string;
    phone?: string;
    email: string;
    gender: UserGender;
    password?: string;
    userId: string;
    role: UserRole;
    avatar?: string;
    address?: string;
    socialLogin?: boolean;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface User_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<User_GET>;
}

export interface AllUsers extends Array<User_GET> {}

export interface User_POST {
    name: string;
    email: string;
    phone?: string;
    gender?: UserGender;
    userId?: string;
    avatar?: string;
    socialLogin?: boolean;
    password?: string;
    role: UserRole;
}

export interface User_PATCH {
    name: string;
    email?: string;
    phone?: string;
    gender?: UserGender;
    password?: string;
    avatar?: string;
    address?: string;

    status: UserStatus;
}

export type PermitType = (context: HookContext, strict?: boolean) => HookContext<any, Service<any>>;
