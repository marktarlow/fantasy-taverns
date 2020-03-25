const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getAll = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let resultPool;
    let result;
    const pool = await poolPromise;
    try {
            resultPool = await pool
            .request()
            .query( 
                `SELECT * FROM Guests`,
            );
            result = resultPool.recordset;
            
            
    } catch (e) {
        throwError(res, e, 500);
    }
    return returnSuccessResponse(res, result, 200); 
}; 
module.exports.getAll = getAll;

const booking = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let data = req.body;
    console.log(data);
    const pool = await poolPromise;
    console.log(data.BookingDate);
    console.log(data.Guest.ID);
    console.log(data.Room.ID);
    console.log(data.StayDateStart);
    console.log(data.StayLength);
    console.log(data.Room.DailyRate);
    try {
        resultPool = await pool
        .request()
        .input('BookingDate', sql.DateTime, data.BookingDate)
        .input('GuestID', sql.Int, data.Guest.ID)
        .input('RoomID', sql.Int, data.Room.ID)
        .input('StayDateStart', sql.DateTime, data.StayDateStart)
        .input('StayLength', sql.Int, data.StayLength)
        .input('DailyRate', sql.Money, data.Room.DailyRate)
        .query( 
            `INSERT INTO RoomStay (BookingDate, GuestID, RoomID, StayDateStart, StayLength, DailyRate) VALUES (@BookingDate, @GuestID, @RoomID, @StayDateStart, @StayLength, @DailyRate)`,
        );
        
        
} catch (e) {
    throwError(res, e, 500);
}
return returnSuccessResponse(res, {success: true}, 200); 

};
module.exports.booking = booking;