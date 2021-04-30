import { Field, InputType } from "type-graphql";

export enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  SUPERADMIN = "SUPERADMIN",
  GUEST = "GUEST",
  SYSTEM = "SYSTEM",
}

@InputType()
export class RoleInput {
  @Field()
  name: string;
}
