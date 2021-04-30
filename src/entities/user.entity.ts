import {Entity, Column} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';
import {validate, IsNotEmpty, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from 'class-validator';
import {Field, FieldResolver, ObjectType, Root} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";
import {UserLinkedEntity} from "../types";

@ObjectType()
@Entity('user')
export class User extends SmartQBaseEntity {

  @Field()
  @Column()
  @Length(2,50, {message: "firsName must be between 2 and 50 characters"})
  firstName: string;

  @Field()
  @Column()
  @Length(2,50, {message: "lastName must be between 2 and 50 characters"})
  lastName: string;

  @Field()
  @IsEmail()
  @Column({unique: true})
  @Length(4,50, {message: "email must be between 2 and 50 characters"})
  email?: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({nullable: true})
  activated: boolean;

  @Field( { nullable: true })
  @Column({nullable: true})
  langKey: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  phone: string;

  //Authorities
  @Field(() => GraphQLJSONObject, { nullable: true })
  @Column('json')
  linkedEntities: UserLinkedEntity;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Column('json', {nullable: true})
  metaData: JSON;

  @Field( { nullable: true })
  @Column({nullable: true})
  imageUrl?: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  activationKey?: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  resetKey?: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  resetDate?: Date;

  @Column("int", { default: 0 })
  tokenVersion: number;
}
