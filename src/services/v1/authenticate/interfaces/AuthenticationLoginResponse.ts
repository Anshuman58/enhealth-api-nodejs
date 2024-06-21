import { User_GET } from '../../../../db_services/v1/user/interfaces/UserInterfaces';

export interface AuthenticationLoginResponse {
    accessToken: string;
    user: User_GET;
}
