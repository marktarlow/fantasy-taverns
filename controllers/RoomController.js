const sql = require('mssql');
const { poolPromise } = require('../data/db');

const tavernRooms = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let resultPool;
    let result;
    const pool = await poolPromise;
    try {
           
            resultPool = await pool
            .request()
            .input('UserId', sql.Int, req.user.ID)
            .query( 
                'SELECT R.ID, R.RoomName, R.RoomStatus, R.TavernID, R.DailyRate FROM Rooms AS R INNER JOIN Taverns AS T ON (R.TavernID = T.ID) INNER JOIN Users AS U ON (T.ID = U.TavernID) WHERE U.ID = @UserId',
            );
            result = resultPool.recordset;
            
    } catch (e) {
        throwError(res, e, 500);
    }
    return returnSuccessResponse(res, result, 200); 
}; 
module.exports.tavernRooms = tavernRooms;