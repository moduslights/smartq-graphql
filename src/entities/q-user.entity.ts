import {
  Entity,
  Column,
  JoinColumn,
  OneToOne
} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';

import {validate, IsNotEmpty, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from 'class-validator';

import {User} from './user.entity';
import {Field} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";

/**
 * A QUser.
 */
@Entity('q_user')
export default class QUser extends SmartQBaseEntity {
  @IsNotEmpty({message: "Phone number is required"})
  @Column({name: 'phone'})
  phone: string;

  @Column({name: 'gender', nullable: true})
  gender: string;

  @Column({name: 'login_type', nullable: true})
  loginType: string;

  @Column({name: 'social_media_type', nullable: true})
  socialMediaType: string;

  @Column({name: 'social_media_id', nullable: true})
  socialMediaId: string;

  @Column({type: 'boolean', name: 'active', default: true})
  active: boolean;

  // @OneToOne(type => User, {
  //   cascade: true
  // })
  // @IsNotEmpty()
  // @JoinColumn()
  // user: User;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Column('json')
  linkedEntities: JSON;
}
