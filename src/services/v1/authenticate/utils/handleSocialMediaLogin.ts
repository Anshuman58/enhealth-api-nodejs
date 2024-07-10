/**
 * Created By Soumya(soumya\@smartters.in) on 10/17/2022 at 2:59 PM.
 */
import { HookContext } from '@feathersjs/feathers';
import { Authenticate_POST, AuthStrategies } from '../interfaces/AuthenticationInterface';
import { SocialLoginUtilities } from '../../../../utils/SocialLoginUtilities/SocialLoginUtilities';
import { SocialLoginInterface } from '../../../../utils/SocialLoginUtilities/SocialLoginInterfaces';
import { BadRequest } from '@feathersjs/errors';
import setErrorMessage from '../../../../utils/setErrorMessage';
import { AuthHelper } from '../../../../utils/AuthHelper/AuthHelper';
import { User_POST } from '../../../../db_services/v1/user/interfaces/UserInterfaces';

/**
 * Handle different types of social media login.
 * @param context - Feathers Context object.
 */
const handleSocialMediaLogin = async (context: HookContext) => {
    const { app, params } = context;

    const { strategy, accessToken, accessTokenSecret, role } = context.data as Authenticate_POST;

    if (!role) throw new BadRequest('Invalid login operation.');

    let userDetailsFromSocialMedia: SocialLoginInterface | undefined = undefined;
    const errorMessageForSocialMedia = {
        result: false,
        message: 'Can not complete your operation. Please try after some time.',
    };

    switch (strategy) {
        case AuthStrategies.GOOGLE:
            userDetailsFromSocialMedia = accessToken
                ? await SocialLoginUtilities.ValidateUserWithGoogle(accessToken)
                : errorMessageForSocialMedia;
            break;

        case AuthStrategies.LINKEDIN:
            userDetailsFromSocialMedia = accessToken
                ? await SocialLoginUtilities.ValidateUserWithLinkedIn(accessToken)
                : errorMessageForSocialMedia;
            break;
    }

    if (userDetailsFromSocialMedia) {
        const { result } = userDetailsFromSocialMedia;
        if (!result) {
            const { errorCode, message } = userDetailsFromSocialMedia;
            throw new BadRequest(errorCode && message ? setErrorMessage(app, errorCode, message) : 'Login error');
        } else {
            const { socialId, email, firstName, middleName, lastName, avatar } = userDetailsFromSocialMedia;
            if (!email) {
                throw new BadRequest('Login Error.');
            }
            const userData = await AuthHelper.checkUserEmail(email, {
                ...params,
                query: {
                    ...params.query,
                    role: role ? role : undefined,
                },
            });
            if (!userData) {
                const newUserData: any = {
                    name: `${firstName} ${lastName}`,
                    avatar,
                    email,
                    role,
                };
                return await AuthHelper.createUserAccount(newUserData).catch((e) => {
                    throw e;
                });
            } else {
                return await AuthHelper.generateAccessToken(userData);
            }
        }
    }
};

export default handleSocialMediaLogin;
