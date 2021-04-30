import {
  Entity,
  Column,
} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';


/**
 * A Address.
 */
@Entity('address')
export default class Address extends SmartQBaseEntity {
  @Column({name: 'address_line_1', nullable: false})
  addressLine1: string;

  @Column({name: 'address_line_2', nullable: true})
  addressLine2: string;

  @Column({name: 'postal_code', nullable: false})
  postalCode: string;

  @Column({name: 'city', nullable: false})
  city: string;

  @Column({name: 'state', nullable: false})
  state: string;

  @Column({name: 'country', nullable: false})
  country: string;

  @Column({type: 'float', name: 'latitude', nullable: true})
  latitude: number;

  @Column({type: 'float', name: 'longitute', nullable: true})
  longitute: number;

}
