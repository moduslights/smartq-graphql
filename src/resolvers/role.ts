import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Mutation,
} from "type-graphql";
import { MyContext } from "../types";
import { RoleInput } from "../entities/roles";
import AuthorityService from "../service/authority-svc";
import {Authority} from "../entities/authority.entity";

@Resolver()
export class RoleResolver {
  private readonly authorityService = new AuthorityService();

  @Query(() => [Authority], { nullable: true })
  async roles(@Ctx() _: MyContext): Promise<Authority[] | undefined> {
    return this.authorityService.getAll();
  }

  @Query(() => Authority, { nullable: true })
  async findRole(@Ctx() _: MyContext,  @Arg("roleId", () => String) roleId: string): Promise<Authority | undefined> {
    return this.authorityService.findRole(roleId);
  }

  @Mutation(() => [Authority], { nullable: true })
  async newRole(
    @Arg("input", () => [String]) roles: string[],
    @Ctx() _: MyContext
  ): Promise<Authority[] | undefined> {
    return this.authorityService.create(roles);
  }

  @Mutation(() => Boolean)
  async deleteRole(
    @Arg("roleId", () => String) roleId: string,
    @Ctx() _: MyContext
  ): Promise<boolean> {
    return this.authorityService.delete(roleId);
  }

  @Mutation(() => Authority, { nullable: true })
  async updateRole(
    @Arg("roleId", () => String) roleId: string,
    @Arg("input", () => RoleInput) { name }: RoleInput,
    @Ctx() _: MyContext
  ): Promise<Authority | undefined> {
      return this.authorityService.update(roleId, name);
  }
}
