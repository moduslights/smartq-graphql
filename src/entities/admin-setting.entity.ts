/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';

/**
 * A AdminSetting.
 */
@Entity('admin_setting')
export default class AdminSetting extends SmartQBaseEntity {
  @Column({name: 'admin_key'})
  key: string;

  @Column({name: 'value'})
  value: string;
}
