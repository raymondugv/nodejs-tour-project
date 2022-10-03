# nodejs-tour-project

Config your database credential at config/config.json

```json
"development": {
	"username": "root",
	"password": null,
	"database": "database_development",
	"host": "127.0.0.1",
	"dialect": "mysql"
},
```

```json
"test": {
	"username": "root",
	"password": null,
	"database": "tour_nodejs_test",
	"host": "127.0.0.1",
	"dialect": "mysql"
},
```

Run below command to start the server

```shell
# first run to init Database
npm run initDB

# start the project
npm run start
```
