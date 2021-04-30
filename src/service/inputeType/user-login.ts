import {Field, InputType} from "type-graphql";

@InputType()
export class UserLogin {
    @Field()
    email: string;
    @Field()
    password: string;
}