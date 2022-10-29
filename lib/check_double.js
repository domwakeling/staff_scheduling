const checkDouble = async (collection, staffid, roomid, day, startTime, endTime, scheduleid='') => {

    let staffBookings = await collection
        .find({ staff: staffid, day: day})
        .toArray();

    staffBookings = staffBookings.filter(item => item._id != scheduleid);

    let roomBookings = await collection
        .find({ room: roomid, day: day })
        .toArray();

    roomBookings = roomBookings.filter(item => item._id != scheduleid);

    const checkTimes = (item) => {
        if (startTime >= item.start && startTime < item.end ) return true;
        if (endTime > item.start && endTime <= item.end) return true;
        if (startTime <= item.start && endTime >= item.end) return true;
        return false;
    }

    for (let i = 0; i < staffBookings.length; i++) {
        if (checkTimes(staffBookings[i])) return [true];        
    }
    

    for (let i = 0; i < roomBookings.length; i++) {
        if (checkTimes(roomBookings[i])) return [false, true];
    }

    return [false, false];
}

export default checkDouble;