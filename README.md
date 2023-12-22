Playing around with [Express](https://expressjs.com/) and Oracle Autonomous Database

To run: `npm run start`

### Adding a route
1. Create a new file with the route name under `./api`
2. Register routes with a `const router = express.Router()`
3. Export the `router`
4. Import the file in `app.js`, e.g. `import myNewApi from './api/my-new-api.js'`
5. Register the routes with the app with `app.use('/api/my-new-api.js', myNewApi)

### Configuring the `.env` file
The `npm` package `dotenv` allows us to define environment variables in the `.env` file and read them using `process.env.ENVIRONMENT_VARIABLE`.

The application expects the following to be defined:
- `ORACLE_USER`: the user which you'd like to connect as
- `ORACLE_PASSWORD`: the password for the user in `ORACLE_USER`
- `CONNECTION_STRING`: the connection string from the Oracle Cloud console (it should look something like `(description= (retry_count=X)(retry_delay=Y)...)`)

### Formatting SQL 

The easiest way to format (and quickly test) your SQL is to use SQL Developer. Format the SQL in the application, copy and paste it into a multi-line string using backticks (`).

### References

[Developing Node.js Applications for Oracle Autonomous Database](https://www.oracle.com/database/technologies/appdev/quickstartnodejs.html#windows-tab)