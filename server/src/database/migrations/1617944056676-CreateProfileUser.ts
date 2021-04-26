import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProfileUser1617944056676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_profile',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'monthly_budget',
            type: 'int',
            default: 0,
          },
          {
            name: 'days_per_week',
            type: 'int',
            default: 0,
          },
          {
            name: 'hours_per_day',
            type: 'int',
            default: 0,
          },
          {
            name: 'vacation_per_year',
            type: 'int',
            default: 0,
          },
          {
            name: 'value_hour',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUsersProfile',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_profile');
  }
}
