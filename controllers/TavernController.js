const sql = require('mssql');
const { poolPromise } = require('../data/db');

const taverns = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let resultPool;
    let result;
    const pool = await poolPromise;
    try {
    
            resultPool = await pool
            .request()
            .query( 
                'SELECT * FROM Taverns',
            );
            result = resultPool.recordset;
            
    } catch (e) {
        throwError(res, e, 500);
    }
    return returnSuccessResponse(res, result, 200); 
}; 
module.exports.taverns = taverns;

const currUserTavern = async function(req, res)
{
    res.setHeader('Content-Type', 'application/json');

    let resultPool;
    let result;
    const pool = await poolPromise;

    
    try {
    
        resultPool = await pool
        .request()
        .input('UserId', sql.Int, req.user.ID)
        .query( 
            'SELECT Taverns.ID, Taverns.TavernName FROM Taverns INNER JOIN Users ON (Taverns.ID = Users.TavernID) WHERE Users.ID = @UserId',
        );
        result = resultPool.recordset.shift();
    } catch (e) {
        throwError(res, e, 500);
    }
    return returnSuccessResponse(res, result, 200);
};
module.exports.currUserTavern = currUserTavern;