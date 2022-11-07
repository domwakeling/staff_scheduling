export const checkDouble = async (collection, staffid, roomid, day, startTime, endTime, week, scheduleid='') => {
    
    let staffBookings = await collection
    .find({ staff: staffid, day: day, week: week})
    .toArray();
    
    staffBookings = staffBookings.filter(item => item._id != scheduleid);
    
    let roomBookings = await collection
    .find({ room: roomid, day: day, week: week })
    .toArray();
    
    roomBookings = roomBookings.filter(item => item._id != scheduleid);
    
    const checkTimes = (item) => {
        if (startTime >= item.start && startTime < item.end) return true;
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

export const checkDoubleUpload = (data) => {

    const checkTimes = (startTime, endTime, item) => {
        if (startTime >= item.start && startTime < item.end) return true;
        if (endTime > item.start && endTime <= item.end) return true;
        if (startTime <= item.start && endTime >= item.end) return true;
        return false;
    }

    for (let i = 0; i < data.length; i++) {
        const lesson = data[i];
        if (lesson.start >= lesson.end ) return false;
        const roomBookings = data
            .filter((_, idx) => idx != i)
            .filter(item => item.room == lesson.room && item.day == lesson.day && item.week == lesson.week);
        for (let j = 0; j < roomBookings.length; j++) {
            if (checkTimes(lesson.start, lesson.end, roomBookings[j])) return false;
        }
        const staffBookings = data
            .filter((_, idx) => idx != i)
            .filter(item => item.staff == lesson.staff && item.day == lesson.day && item.week == lesson.week);
        for (let j = 0; j < staffBookings.length; j++) {
            if (checkTimes(lesson.start, lesson.end, staffBookings[j])) return false;
        }
    };

    // if we get here we're OK
    return true;
}