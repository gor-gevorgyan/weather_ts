import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class history1598348032864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "history",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "user_id",
                    type: "int",
                },
                {
                    name: "data",
                    type: "text",
                },
                {
                    name: "created_at",
                    type: "datetime",
                }
            ]
        }), true);

        await queryRunner.createForeignKey("history", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table: any = await queryRunner.getTable("history");
        const foreignKey: TableForeignKey = table.foreignKeys.find((fk: any) => fk.columnNames.indexOf("user_id") !== -1);

        await queryRunner.dropForeignKey("history", foreignKey);
        await queryRunner.dropTable('history');
    }

}
