/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
  JoinColumn,
  OneToOne
} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';
import QUser from './q-user.entity';
import {Field} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";

/**
 * A UserDevice.
 */
@Entity('user_device')
export default class UserDevice extends SmartQBaseEntity {
  @Column({name: 'device_token'})
  deviceToken: string;

  @Column({name: 'device_type'})
  deviceType: string;

  @Column({name: 'os_version'})
  osVersion: string;

  @Column({type: 'boolean', name: 'force_update', default: false})
  forceUpdate: boolean;

  // @OneToOne(type => QUser)
  // @JoinColumn()
  // quser: QUser;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Column('json')
  linkedEntities: JSON;
}
