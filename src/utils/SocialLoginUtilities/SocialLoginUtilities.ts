import { ConnectInterface, SocialLoginInterface } from './SocialLoginInterfaces';
import validateUserWithGoogle from './utils/validateUserWithGoogle';
import validateUserWithLinkedin from './utils/validateUserWithLinkedin';

/**
 * This class implements all the utilities functions for
 * authorizing the access token received from the client side
 * with the OAuth server of different Oauth Platforms.
 *
 *
 * The functions return the user related information associated with the
 * Oauth Platform.
 *
 * Use the information according to your requirements.
 *
 *
 * Exception For Twitter - For Twitter authorization we require the consumer key
 * and consumer and secret from the application which is created in the twitter
 * platform.
 */
export class SocialLoginUtilities {
    // Google Configuration.
    private static google_oauth_url = 'https://www.googleapis.com/oauth2/v2/userinfo';

    // LinkedIn Configuration.
    // private static linkedin_email_url = 'https://api.linkedin.com/v2/emailAddress';
    // private static linkedin_profile_url = 'https://api.linkedin.com/v2/me';

    private static linkedin_user_info_url = 'https://api.linkedin.com/v2/userinfo';

    /**
     * Validate the access token with google server and get the user details
     * from Google.
     *
     * @param accessToken - Access token authorized with google.
     *
     * @returns
     * Success - Returns the user related information from google.
     * Failure - Returns an error message.
     */
    static async ValidateUserWithGoogle(accessToken: string): Promise<SocialLoginInterface> {
        const profileUrl = SocialLoginUtilities.google_oauth_url;

        return await validateUserWithGoogle(accessToken, profileUrl);
    }

    /**
     * Validate the access token with linkedIn server and get the user details
     * from LinkedIn.
     *
     * @param accessToken - Access token authorized with linkedIn.
     *
     * @returns
     * Success - Returns the user related information from linkedIn.
     * Failure - Returns an error message.
     */
    static async ValidateUserWithLinkedIn(accessToken: string): Promise<SocialLoginInterface> {
        // const emailUrl = SocialLoginUtilities.linkedin_email_url;
        // const profileUrl = SocialLoginUtilities.linkedin_profile_url;

        const userInfoUrl = SocialLoginUtilities.linkedin_user_info_url;
        return await validateUserWithLinkedin(accessToken, userInfoUrl);
    }
}
