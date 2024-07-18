import { HookContext } from "@feathersjs/feathers";
import { BadRequest, NotAuthenticated } from "@feathersjs/errors";
import { userPath } from "../../../../service_endpoints/services";
import jwt_decode from "jwt-decode";
import {
    User_GET,
    UserStatus,
} from "../../../../db_services/v1/user/interfaces/UserInterfaces";
import { decodedValue } from "../interfaces/AuthenticationInterface";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";

const handleJWTAuthentication = async (context: HookContext): Promise<any> => {
    const { app, params, data } = context;

    if (!params.headers || !params.headers.authorization)
        throw new NotAuthenticated("AccessToken is required in header!");

    const accessToken: string = params.headers.authorization.split(" ")[1];

    const decodedValue: decodedValue = jwt_decode(accessToken);
    if (!decodedValue) throw new BadRequest("Invalid Access Token");

    const { exp, sub } = decodedValue;

    const userData = await app
        .service(userPath)
        .get(sub.toString(), {
            provider: "server",
            query: {
                status: { $ne: UserStatus.REMOVED },
            },
        })
        .catch(() => {
            throw new NotAuthenticated("Invalid AccessToken");
        });

    let response: { accessToken: string; user: User_GET };

    if (exp) {
        if (exp * 1000 > Date.now()) {
            response = {
                accessToken,
                user: userData,
            };
            data.refreshed = false;
        } else {
            const { accessToken, user } = await AuthHelper.generateAccessToken(
                userData,
                true
            );
            response = {
                accessToken,
                user: user,
            };
            data.refreshed = true;
        }
    } else {
        //create a new AccessToken using userId
        throw new NotAuthenticated("Invalid AccessToken");
    }

    return response;
};

export default handleJWTAuthentication;
