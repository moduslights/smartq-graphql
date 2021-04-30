
import { MyContext } from "../types";
import {AuthChecker} from "type-graphql";
import UserService from "../service/user-svc";

const userService = new UserService();

// create auth checker function
export const authChecker: AuthChecker<MyContext> = async ({ context: { payload } }, roles) => {
    if (roles.length === 0) {
        // if `@Authorized()`, check only if user exists
        return payload?.userId !== undefined;
    }
    // there are some roles defined now

    if (!payload?.userId) {
        // and if no user, restrict access
        return false;
    }

    const user = await userService.getUserByEmail(payload.email);
    const userRole = user?.linkedEntities.roles;
    if (userRole?.some(role => roles.includes(role))) {
        // grant access if the roles overlap
        return true;
    }

    // no roles matched, restrict access
    return false;
};