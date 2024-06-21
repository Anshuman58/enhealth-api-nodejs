import { Params, ServiceAddons } from '@feathersjs/feathers';
import { User_FIND, User_GET, User_POST, UserStatus } from '../../db_services/v1/user/interfaces/UserInterfaces';
import { authenticationPath, userPath } from '../../service_endpoints/services';
import { LoginInterface } from './AuthHelperInterface';
import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { Service } from 'feathers-mongoose';
import { Application as ApplicationCore } from '../../declarations';
import { AuthenticationService } from '@feathersjs/authentication';
import { Actions, AuthStrategies, UpdateUser } from '../../services/v1/authenticate/interfaces/AuthenticationInterface';
import jwt_decode from 'jwt-decode';
import { decodedValue } from '../../services/v1/authenticate/interfaces/AuthenticationInterface';

export class AuthHelper {
    private static _userService: Service & ServiceAddons<any>;
    private static _authenticationService: AuthenticationService & ServiceAddons<any>;
    private static _expirationTime: number;

    /**
     * Initialize service with the user path.
     *
     * @param app - The application object from feathers js.
     */
    static initializeAuth(app: ApplicationCore): void {
        AuthHelper._userService = app.service(userPath);
        AuthHelper._authenticationService = app.service(authenticationPath);
        AuthHelper._expirationTime = app.get('otp').expireOn;
    }

    /**
     * Verifies if phone number is valid or not.
     * @param phone - phone number
     */
    static validatePhoneNumber(phone: string): void {
        if (!/^(([0-9 +_\-,.^*?$^#()])|(ext|x)){1,20}$/.test(phone)) {
            throw new BadRequest('Please provide a valid phone number!');
        }
    }

    /**
     * Verifies if phone number is valid or not.
     * @param email - email address
     */
    static validateEmail(email: string): void {
        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            throw new BadRequest('Please provide a valid Email address.');
        }
    }

    /**
     * Check if any existing user with same email id and retrieve its data.
     *
     * @param email - Email address based on which search will be performed.
     * @param params - Feathers Params object.
     *
     * @returns The user object if found otherwise null.
     */
    static async checkUserEmail(email: string, params: Params): Promise<User_GET | null> {
        return await AuthHelper._userService
            ._find({
                query: {
                    ...params.query,
                    email,
                    status: { $ne: -1 },
                },
            })
            .then((res: User_FIND) => (res.total ? res.data[0] : null));
    }

    /**
     * Check if any existing user with same email id and retrieve its data.
     *
     * @param phone - Phone number based on which search will be performed.
     * @param params - Feathers Params object.
     *
     * @returns The user object if found otherwise null.
     */
    static async checkUserPhone(phone: string, params: Params): Promise<User_GET | null> {
        return await AuthHelper._userService
            ._find({
                query: {
                    ...params.query,
                    phone,
                    status: { $ne: -1 },
                },
            })
            .then((res: User_FIND) => (res.total ? res.data[0] : null));
    }

    /**
     * Generate access token for the user.
     *
     * @param userData - User details for whom token will be generated.
     * @param canExpire - tells if the access token can expire or not.
     * @returns The accessToken with the user object.
     */
    static async generateAccessToken(userData: User_GET, canExpire = false): Promise<LoginInterface> {
        const payload: any = {
            sub: userData._id,
        };

        delete userData.password;
        if (canExpire) payload.expiresIn = `${AuthHelper._expirationTime}m`;
        const accessToken = await AuthHelper._authenticationService.createAccessToken(payload);
        return { accessToken, user: userData };
    }

    /**
     * Create user's account return the result associated with an access token.
     *
     * @param data - Data needed for the user create method.
     *
     * @returns The user object and access token.
     */
    static async createUserAccount(data: User_POST): Promise<LoginInterface> {
        return await AuthHelper._userService
            .create(
                {
                    ...data,
                },
                {
                    query: {},
                    provider: 'server',
                },
            )
            .catch((e: any) => {
                throw e;
            });
    }

    /**
     * Update the user's email or phone as verified.
     * @param userId - id of the user to be updated.
     * @param data - Data to be updated.
     * @param params - Params object feathers.
     *
     * @returns updated user object.
     */
    static async updateUserAndAuthenticate(userId: string, data: UpdateUser, params: Params): Promise<User_GET> {
        return await AuthHelper._userService._patch(
            userId,
            {
                ...data,
            },
            {
                query: {
                    ...params.query,
                },
            },
        );
    }

    /**
     * Update the user's password.
     *
     * @returns updated user object.
     * @param params
     * @param action
     * @param password
     */

    static async resetPassword(params: Params, action: string, password: string): Promise<any> {
        if (action !== Actions.RESET_PASSWORD) throw new BadRequest('Invalid Request');
        if (!password) throw new BadRequest('password is required');

        if (!params.headers || !params.headers.authorization)
            throw new NotAuthenticated('AccessToken is required in header!');

        const accessToken: string = params.headers.authorization.split(' ')[1];

        const decodedValue: decodedValue = jwt_decode(accessToken);

        if (!decodedValue) throw new BadRequest('Invalid Access Token');

        const { exp, sub } = decodedValue;

        const userData = await AuthHelper._userService
            ._get(sub.toString(), {
                provider: 'server',
                query: {
                    status: { $ne: UserStatus.REMOVED },
                },
            })
            .catch(() => {
                throw new NotAuthenticated('Invalid AccessToken');
            });

        let response: any;

        if (exp) {
            if (exp * 1000 > Date.now()) {
                await AuthHelper._userService
                    .patch(
                        sub.toString(),
                        {
                            password: password,
                        },
                        {
                            provider: 'server',
                        },
                    )
                    .catch(() => {
                        throw new NotAuthenticated('Something went wrong');
                    });

                response = {
                    success: true,
                };
            } else {
                throw new BadRequest('Forgot Password operation timed out.');
            }
        } else {
            //create a new AccessToken using userId
            throw new NotAuthenticated('Invalid AccessToken');
        }

        return response;
    }
}
