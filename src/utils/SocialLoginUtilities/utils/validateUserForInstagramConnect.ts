/**
 * Created By Soumya(soumya.smartters\@gmail.com) on 9/3/2022 at 9:41 PM.
 */

import axios from 'axios';
import { ConnectInterface, SocialLoginErrorCodes } from '../SocialLoginInterfaces';

/**
 * Validate the access token with instagram server and get the user details
 * from Instagram.
 *
 * @param accessToken - Access token authorized with instagram.
 * @param profileUrl - Instagram Oauth URL.
 *
 * @returns
 * Success - Returns the user related information from instagram.
 * Failure - Returns an error message.
 */
const validateUserForInstagramConnect = async (accessToken: string, profileUrl: string): Promise<ConnectInterface> => {
    // Get user data from instagram.
    const userInstagramData = await axios
        .get(profileUrl, {
            params: {
                access_token: accessToken,
            },
        })
        .then((res) => res.data)
        .catch((e) => {
            return e.response.data;
        });

    const { id: instagramId, message } = userInstagramData;

    // if user not found return error.
    if (!instagramId) {
        return {
            result: false,
            errorCode: SocialLoginErrorCodes.INSTAGRAM_CONNECT,
            message,
        };
    }

    // Return the user's data fetched from instagram.
    const { username } = userInstagramData;
    return {
        result: true,
        socialId: instagramId,
        username: username,
    };
};

export default validateUserForInstagramConnect;
