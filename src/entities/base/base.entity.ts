import {ObjectIdColumn, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Field, ObjectType} from "type-graphql";
import {BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm/index";

@ObjectType()
export abstract class SmartQBaseEntity extends  BaseEntity{

  @Field(() => String)
  @ObjectIdColumn()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field(() => String, { nullable: true })
  @Column({nullable: true})
  createdBy?: string;

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdDate?: Date;

  @Field(() => String, { nullable: true })
  @Column({nullable: true})
  lastModifiedBy?: string;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  lastModifiedDate?: Date;

  @Field(() => Boolean, { nullable: true })
  @Column({default: true, type: 'boolean', name: 'active'})
  active: boolean;
}
