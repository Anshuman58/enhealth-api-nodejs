import { disallow, iff, isProvider } from "feathers-hooks-common";
import CustomProtectHook from "../../../hooks/CustomProtectHook";
import patchDeleted from "../../../hooks/PatchDeleted";
import GenAccessToken from "../../../services/v1/user-management/hooks/GenAccessToken";
import hashPassword from "@feathersjs/authentication-local/lib/hooks/hash-password";
// Don't remove this comment. It's needed to format import lines nicely.

export default {
    before: {
        all: [iff(isProvider("server", "socketio")).else(disallow())],
        find: [],
        get: [],
        create: [],
        update: [disallow()],
        patch: [hashPassword("password")],
        remove: [patchDeleted()],
    },

    after: {
        all: [iff(isProvider("external"), CustomProtectHook("password"))],
        find: [],
        get: [],
        create: [GenAccessToken()],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
