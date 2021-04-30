import {Entity, PrimaryColumn} from 'typeorm';
import {Field, Int, ObjectType} from "type-graphql";
import {SmartQBaseEntity} from "./base/base.entity";
import {Column, Unique} from "typeorm/index";
import {validate, IsNotEmpty, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from 'class-validator';


@ObjectType()
@Entity('authority')
export class Authority extends SmartQBaseEntity{

  @Field(() => String)
  @Column({ unique: true })
  name: string;
}
