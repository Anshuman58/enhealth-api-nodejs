/**
 * Created By Soumya(soumya\@smartters.in) on 10/17/2022 at 1:42 PM.
 */
import { HookContext } from "@feathersjs/feathers";
import { BadRequest, FeathersError } from "@feathersjs/errors";
import { AuthenticationResult } from "@feathersjs/authentication";
import {
    User_GET,
    UserRole,
} from "../../../../db_services/v1/user/interfaces/UserInterfaces";
import {
    authenticationPath,
    userPath,
} from "../../../../service_endpoints/services";

/**
 * Handle email password login with local strategy and jwt strategy verification.
 * @param context - Context object from hook.
 * @returns - The accessToken and user object received for the given credentials.
 */
const handleLocalAndJWTAuthentication = async (
    context: HookContext
): Promise<{
    accessToken: string;
    authentication: AuthenticationResult;
    user: User_GET;
}> => {
    const { data, app, params } = context;

    const { email, role } = data;

    if (email) {
        const res = await app
            .service(userPath)
            ._find({
                query: {
                    email: email,
                    role: role,
                    $limit: 1,
                },
                paginate: false,
            })
            .catch(() => {
                return [];
            });

        if (!res.length) throw new BadRequest("Invalid Credential");
    }

    const authenticationService = app.service(authenticationPath);

    /*Need to change the below line in future*/
    // if (![UserRole.SUPER_ADMIN, UserRole.USER].includes(data.role)) throw new BadRequest('Invalid login request!');

    return await authenticationService
        .create(
            {
                ...data,
            },
            {
                ...params,
                provider: "server",
            }
        )
        .catch((e: FeathersError) => {
            throw e;
        });
};

export default handleLocalAndJWTAuthentication;
