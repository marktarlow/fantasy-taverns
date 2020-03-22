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
            .input('RoomName', sql.VarChar, req.query.Search)
            .query( 
                `SELECT R.ID, R.RoomName, R.RoomStatus, R.TavernID, R.DailyRate FROM Rooms AS R INNER JOIN Taverns AS T ON (R.TavernID = T.ID) INNER JOIN Users AS U ON (T.ID = U.TavernID) WHERE U.ID = @UserId AND R.RoomName Like '%' + @RoomName + '%'`,
            );
            result = resultPool.recordset;
            
            
    } catch (e) {
        throwError(res, e, 500);
    }
    return returnSuccessResponse(res, result, 200); 
}; 
module.exports.tavernRooms = tavernRooms;


const getById = async function(req, res) {
    let roomId = parseInt(req.params.roomId);
    res.setHeader('Content-Type', 'application/json');
    let todoPool;
    let todo;
    const pool = await poolPromise;

    try {
        todoPool = await pool
            .request()
            .input('Id', sql.Int, roomId)
            .query('Select * from Rooms where Id = @Id');
        todo = todoPool.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, todo, 200);
};

module.exports.getById = getById;

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let roomPool;
    let room = req.body;

    if (!room.RoomName) {
        return returnError(res, 'Please enter a Name', 422);
    }

    const pool = await poolPromise;

    try {
        roomPool = await pool
            .request()
            .input('RoomName', sql.VarChar, room.RoomName)
            .input('RoomStatus', sql.Bit, room.RoomStatus)
            .input('TavernID', sql.Int, req.user.TavernID)
            .input('DailyRate', sql.Int, room.DailyRate)
            .query(
                // eslint-disable-next-line quotes
                `INSERT INTO Rooms (RoomName, RoomStatus, TavernID, DailyRate) OUTPUT INSERTED.* VALUES(@RoomName, @RoomStatus, @TavernID, @DailyRate)`,
            );
        room = roomPool.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 201);
};

module.exports.create = create;

const edit = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let roomPool;
    let room = req.body;

    if (!room.RoomName) {
        return returnError(res, 'Please enter a Name', 422);
    }

    const pool = await poolPromise;

    try {
        roomPool = await pool
            .request()
            .input('ID', sql.Int, room.ID)
            .input('RoomName', sql.VarChar, room.RoomName)
            .input('DailyRate', sql.Int, room.DailyRate)
            .query(
        
                `Update Rooms Set RoomName = @RoomName , DailyRate = @DailyRate WHERE ID = @ID`,
            );
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 200);
};

module.exports.edit = edit;
