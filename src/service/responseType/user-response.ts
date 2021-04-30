import {Field, ObjectType} from "type-graphql";
import {FieldError} from "./field-error";
import {User} from "../../entities/user.entity";

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
    @Field( {nullable: true})
    accessToken?: string;
    @Field(() => User, {nullable: true})
    user?: User;
}