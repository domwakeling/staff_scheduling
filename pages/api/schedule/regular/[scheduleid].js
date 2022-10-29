import { MAIN_DB_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../../lib/constants';
import checkDouble from '../../../../lib/check_double';
import clientPromise from '../../../../lib/database';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {

    const { scheduleid } = req.query;

    if (req.method == 'GET') {

        if (scheduleid == '') {
            res.json({});
            return;
        }

        const client = await clientPromise;
        const db = client.db(MAIN_DB_NAME);
        const schedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);

        try {
            const scheduleObjectId = new ObjectId(scheduleid);
            const foundSchedule = await schedule.findOne({ _id: scheduleObjectId });
            res.json(foundSchedule);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    if (req.method == 'PUT') {

        const { staffid, lessonid, roomid, start, end, day } = req.body;

        const startFloat = parseFloat(start);
        const endFloat = parseFloat(end);

        const isValid = (str) => !(!str || str == '');

        if (!startFloat || !endFloat || !isValid(staffid) || !isValid(lessonid) || !isValid(roomid) || !isValid(day)) {
            res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing' });
            return;
        }

        const client = await clientPromise;
        const db = client.db(MAIN_DB_NAME);
        const schedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);

        // check if there is a conflict and if so report it
        const checking = await checkDouble(schedule, staffid, roomid, day, startFloat, endFloat, scheduleid);
        console.log('CHECKING RESULT:', checking)
        if (checking[0] == true) {
            res.status(RESPONSE_ERROR).json({ message: 'Staff member has a conflicting booking' });
            return;
        }
        if (checking[1] == true) {
            res.status(RESPONSE_ERROR).json({ message: 'Room has a conflicting booking' });
            return;
        }

        try {
            const scheduleObjectId = new ObjectId(scheduleid);
            const foundSchedule = await schedule.updateOne(
                { _id: scheduleObjectId },
                { $set: {
                    day: day,
                    start: startFloat,
                    end: endFloat,
                    staff: staffid,
                    room: roomid,
                    lesson: lessonid
                }}
            );
            res.json(foundSchedule);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    if (req.method == 'DELETE') {

        const client = await clientPromise;
        const db = client.db(MAIN_DB_NAME);
        const schedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);

        try {
            // get an ObjectId
            const scheduleObjectId = new ObjectId(scheduleid);
            // delete the schedule item
            const regularSchedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);
            const deletedClass = await regularSchedule.deleteOne({ _id: scheduleObjectId });

            res.json(deletedClass);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
    return;

};

export default handler;
