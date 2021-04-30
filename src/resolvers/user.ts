import {
    Arg,
    Ctx,
    Query,
    Resolver,
    Mutation, Authorized, ObjectType, Field,
} from "type-graphql";
import {MyContext} from "../types";
import UserService from "../service/user-svc";
import {UserResponse} from "../service/responseType/user-response";
import {UserRegister} from "../service/inputeType/user-register";
import {User} from "../entities/user.entity";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {

    private readonly userService = new UserService();

    @Query(() => User, {nullable: true})
    async me(@Ctx() @Ctx() {payload }: MyContext): Promise<User | undefined> {
        return this.userService.getUserFromPayload(payload)
    }

    @Query(() => [User], {nullable: true})
    @Authorized(["USER"])
    async users(@Ctx() _: MyContext): Promise<User[] | undefined> {
        return this.userService.getAllUsers();
    }

    @Query(() => User, {nullable: true})
    @Authorized()
    async getUserByEmail(@Ctx() {payload}: MyContext,
                         @Arg("email") email : string): Promise<User | undefined> {
        return this.userService.getUserByEmail(email);
    }

    @Mutation(() => UserResponse, {nullable: true})
    async createUser(
        @Arg("options", () => UserRegister)
            userInput : UserRegister,
        @Ctx() _: MyContext
    ): Promise<UserResponse> {
        return this.userService.register(userInput)
    }

    @Mutation(() => UserResponse)
    login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<UserResponse> {
        return  this.userService.login(res, email, password);
    }


    @Mutation(() => UserResponse)
    @Authorized(["ADMIN", "SUPER-ADMIN"])
    async addUserRole(
        @Arg("roles", () => [String]) roles: string[],
        @Arg("userId") userId: string,
        @Ctx() @Ctx() {payload}: MyContext
    ): Promise<UserResponse> {
        return  await this.userService.addUserRole(roles, userId);
    }

    @Mutation(() => UserResponse)
    @Authorized(["ADMIN", "SUPER-ADMIN"])
    async removeUserRole(
        @Arg("roles", () => [String]) roles: string[],
        @Arg("userId") userId: string,
        @Ctx() @Ctx() {payload}: MyContext
    ): Promise<UserResponse> {
        return  await this.userService.removeUserRole(roles, userId);
    }

    // @Mutation(() => Authority, { nullable: true })
    // async updateRole(
    //   @Arg("roleId", () => Int) roleId: number,
    //   @Arg("input", () => RoleInput) { name }: RoleInput,
    //   @Ctx() _: MyContext
    // ): Promise<Authority | null> {
    //   console.log("roleId", roleId);

    //   const role = await Authority.findByPk(roleId);

    //   if (!role) {
    //     return null;
    //   }

    //   if (typeof name !== undefined) {
    //     role.name = name;
    //   }
    //   const updatedRole = await role.save();
    //   return updatedRole;
    // }
}
