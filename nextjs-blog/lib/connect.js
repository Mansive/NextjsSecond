const sql = require('mssql');

const config = {
    user: 'employee', // better stored in an app setting such as process.env.DB_USER
    password: 'CougarSupplyDen1!', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'cougarsupplyden3380.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'CougarSupplyDen', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

export async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM INFORMATION_SCHEMA.TABLES`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("Outputting rows...")
            console.log("%s\t%s", row.CategoryName, row.ProductName);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
        return columns;
    } catch (err) {
        console.error(err.message);
        return err.message;
    }
}

//export async function getResults() {
//    var result = await connectAndQuery();
//    return result;
//}