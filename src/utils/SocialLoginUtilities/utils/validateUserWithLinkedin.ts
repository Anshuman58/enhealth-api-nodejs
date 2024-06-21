import Axios from 'axios';
import { SocialLoginInterface, SocialLoginErrorCodes } from '../SocialLoginInterfaces';

/**
 * Validate the access token with linkedIn server and get the user details
 * from LinkedIn.
 *
 * @param accessToken - Access token authorized with linkedIn.
 * @param profileUrl - LinkedIn Oauth URL.
 *
 * @returns
 * Success - Returns the user related information from linkedIn.
 * Failure - Returns an error message.
 */
const validateUserWithLinkedin = async (accessToken: string, profileUrl: string): Promise<SocialLoginInterface> => {
    // Get user email address from linkedIn.
    const linkedinUserInfo = await Axios.get(profileUrl, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    })
        .then((res) => res.data)
        .catch((e) => {
            return e.response.data;
        });

    const { given_name, family_name, email, sub, picture, serviceErrorCode, message } = linkedinUserInfo;

    if (serviceErrorCode && message) {
        return {
            result: false,
            errorCode: SocialLoginErrorCodes.LINKEDIN_LOGIN,
            message,
        };
    }
    if (!email) {
        return {
            result: false,
            errorCode: SocialLoginErrorCodes.LINKEDIN_LOGIN_EMAIL,
            message: 'Please provide email access to the application while authorizing with linkedin.',
        };
    }

    //return the user data fetch using linkedin userinfo api

    return {
        result: true,
        firstName: given_name,
        lastName: family_name,
        email,
        avatar: picture ?? undefined,
    };
};

export default validateUserWithLinkedin;
