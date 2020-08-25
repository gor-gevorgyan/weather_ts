import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Users1598344925891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "ip",
                    type: "varchar(14)"
                },
                {
                    name: "created_at",
                    type: "datetime",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
