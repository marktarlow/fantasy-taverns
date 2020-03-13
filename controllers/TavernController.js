const sql = require('mssql');
const { poolPromise } = require('../data/db');

const taverns = async function(req, res)
{
    res.setHeader('Content-Type', 'application/json'); 
    let resultPool;
    let result;
    const pool = await poolPromise;
    try {
            resultPool = await pool
            .request()
            .query( 
                'SELECT * FROM Taverns;'
            );
            result = resultPool.recordset;
            
    } catch (e) {
        throwError(e.message);
    }
    return result;

}
module.exports.taverns = taverns;