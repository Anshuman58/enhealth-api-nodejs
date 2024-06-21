
import { Types } from 'mongoose';
import { Country } from '../../country/interfaces/CountryInterfaces';

/**
 * @description interfaces for user
 */

interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    country?: Country;
    role: 1 | 2 | 3;
    status: 1 | -1;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface Users {
    total: number;
    skip: number;
    limit: number;
    data: Array<User>;
}

interface AllUsers extends Array<User> {}

export { User, Users, AllUsers };
