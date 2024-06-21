
import { Country } from '../../country/interfaces/CountryInterfaces';

/**
 * @description interfaces for user request.
 */

interface UserDatum {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role: 1 | 2 | 3;
    status: 1 | -1;
    country?: Country;
}

interface UserData extends Array<UserDatum> {}

export { UserDatum, UserData };
