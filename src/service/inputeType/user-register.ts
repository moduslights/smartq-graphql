import {Field, InputType} from "type-graphql";

@InputType()
export class UserRegister {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field(() => String, {nullable: true})
    phone: string;
    @Field()
    password: string;
}