export interface SocialLoginInterface {
    result: boolean;
    socialId?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    avatar?: string;
    errorCode?: string;
    message?: string;
}

export interface ConnectInterface {
    result: boolean;
    socialId?: string;
    username?: string;
    errorCode?: string;
    message?: string;
}

export enum SocialLoginErrorCodes {
    GOOGLE_LOGIN = 'google_login',
    FACEBOOK_LOGIN = 'facebook_login',
    FACEBOOK_LOGIN_EMAIL = 'facebook_login_email',
    APPLE_LOGIN = 'apple_login',
    APPLE_LOGIN_EMAIL = 'apple_login_email',
    LINKEDIN_LOGIN = 'linkedin_login',
    LINKEDIN_LOGIN_EMAIL = 'linkedin_login_email',
    TWITTER_LOGIN = 'twitter_login',
    TWITTER_LOGIN_EMAIL = 'twitter_login_email',
    INSTAGRAM_CONNECT = 'instagram_connect',
    YOUTUBE_CONNECT = 'youtube_connect',
}
