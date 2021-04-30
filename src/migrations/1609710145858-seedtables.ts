import {MigrationInterface, QueryRunner} from "typeorm";
import {Authority} from "../entities/authority.entity";
import {User} from "../entities/user.entity";

export class seedtables1609710145858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const conn = queryRunner.connection;

        await conn
            .createQueryBuilder()
            .insert()
            .into(Authority)
            .values([{name: "ADMIN"}, {name: "SUPER-ADMIN"}, {name: "SYSTEM"}, {name: "USER"}])
            .execute();

        await conn
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([{
                password: 'system',
                firstName: 'System',
                lastName: 'System',
                email: 'support@moduslights.com',
                imageUrl: '',
                activated: true,
                langKey: 'en',
                createdBy: 'support@moduslights.com',
                lastModifiedBy: 'support@moduslights.com',
                linkedEntities: JSON.parse(`{"roles":["ADMIN","SYSTEM","SUPER-ADMIN"]}`)
            }])
            .execute();

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
