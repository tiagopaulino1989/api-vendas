const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

const { PROD_SGDB, PROD_DB_HOST, PROD_DB_PORT, PROD_DB_USER, PROD_DB_PWD, PROD_DB_DATABASE, NODE_ENV } = process.env

const rootDir = NODE_ENV === 'development' ? 'src' : 'dist'

const connectionObject = {
	mysql: {
		type: PROD_SGDB,
		host: PROD_DB_HOST,
		port: PROD_DB_PORT,
		username: PROD_DB_USER,
		password: PROD_DB_PWD,
		database: PROD_DB_DATABASE
	}
}

module.exports = {
	...connectionObject[PROD_SGDB],
	synchronize: false,
	logging: false,
	migrations: [`${rootDir}/shared/typeorm/migrations/*.{js,ts}`],
	namingStrategy: new SnakeNamingStrategy(),
	cli: {
		migrationsDir: `${rootDir}/shared/typeorm/migrations`
	}
}
