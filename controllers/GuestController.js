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
    let resultPool;
    let result;
    const pool = await poolPromise;
    const bookingDate = new Date();
    const stayDateStart = new Date(data.StayDateStart);
    try {
        resultPool = await pool
        .request()
        .input('BookingDate', sql.DateTime, bookingDate)
        .input('GuestID', sql.Int, data.Guest.ID)
        .input('RoomID', sql.Int, data.Room.ID)
        .input('StayDateStart', sql.DateTime, stayDateStart)
        .input('StayLength', sql.Int, data.StayLength)
        .input('DailyRate', sql.Money, data.Room.DailyRate)
        .query( 
           `INSERT INTO RoomStays ([BookingDate], [GuestID], [RoomID], [StayDateStart], [StayLength], [DailyRate]) VALUES (@BookingDate, @GuestID, @RoomID, @StayDateStart, @StayLength, @DailyRate)`,
            
        );
        

        
} catch (e) {
    throwError(res, e, 500);
}

    return returnSuccessResponse(res, {success: true}, 201); 

};
module.exports.booking = booking;

const getRoomStay = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const date = req.query.bookDate;
    const tempBookingDate = new Date(date);
    let resultPool;
    let result;
    const pool = await poolPromise;
    try {
            resultPool = await pool
            .request()
            .input('BookingDate', sql.DateTime, tempBookingDate)
            .query( 
                `SELECT DISTINCT RoomID FROM RoomStays WHERE (StayDateStart + StayLength) < @BookingDate`,
            );
            result = resultPool.recordset;
            
        console.log(result);
    } catch (e) {
        throwError(res, e, 500);
    }
    return returnSuccessResponse(res, result, 200); 
}; 
module.exports.getRoomStay = getRoomStay;