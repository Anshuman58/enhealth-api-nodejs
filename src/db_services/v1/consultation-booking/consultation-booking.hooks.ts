import * as authentication from "@feathersjs/authentication";
import SetCreatedBy from "../../../hooks/SetCreatedBy";
import FRequired from "../../../hooks/FRequired";
import SetDefaultItem from "../../../hooks/SetDefaultItem";
import { EntityStatus } from "../../../global_interface/Interface";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
// 667710ec995e2771ce210614
export default {
    before: {
        all: [authenticate("jwt")],
        find: [],
        get: [],
        create: [
            SetCreatedBy("vendor"),
            FRequired("doctor"),
            SetDefaultItem("status", EntityStatus.ACTIVE),
        ],
        update: [],
        patch: [],
        remove: [],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
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
