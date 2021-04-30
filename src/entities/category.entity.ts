/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column
} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';


/**
 * A Category.
 */
@Entity('category')
export default class Category extends SmartQBaseEntity {
  @Column({name: 'name'})
  name: string;
}
