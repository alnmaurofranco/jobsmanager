const dotenv = require('dotenv')
const { resolve } = require('path')

dotenv.config({
  path:
    process.env.NODE_ENV !== 'production'
      ? resolve(__dirname, '.env.development')
      : resolve(__dirname, '.env.production')
})

module.exports = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATION],
  cli: {
    "entitiesDir": "src/database/entities",
    "migrationsDir": "src/database/migrations"
  }
}
