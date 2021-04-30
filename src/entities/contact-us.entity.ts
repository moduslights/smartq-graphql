/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  Column,
} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';

/**
 * A ContactUs.
 */
@Entity('contact_us')
export default class ContactUs extends SmartQBaseEntity {
  @Column({name: 'name', nullable: false})
  name: string;

  @Column({name: 'email', nullable: false})
  email: string;

  @Column({name: 'description', nullable: false})
  description: string;
}
