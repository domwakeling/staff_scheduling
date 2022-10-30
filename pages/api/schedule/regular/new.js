import { MAIN_DB_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../../lib/constants';
import checkDouble from '../../../../lib/check_double';
import clientPromise from '../../../../lib/database';

const handler = async (req, res) => {

    const { staffid, lessonid, roomid, start, end, day } = req.body;

    const startFloat = parseFloat(start);
    const endFloat = parseFloat(end);

    const isValid = (str) => !(!str || str == '');

    if (!startFloat || !endFloat || !isValid(staffid) || !isValid(lessonid) || !isValid (roomid) || !isValid(day)) {
        res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing' });
        return;
    }

    const newItem = {
        start: startFloat,
        end: endFloat,
        day: day,
        staff: staffid,
        room: roomid,
        lesson: lessonid
    };

    if (req.method == 'POST') {

        try {
            const client = await clientPromise;

            // Get the database and collection
            const db = client.db(MAIN_DB_NAME);
            const schedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);

            // check if there is a conflict and if so report it
            const checking = await checkDouble(schedule, staffid, roomid, day, startFloat, endFloat);
            if (checking[0] == true) {
                res.status(RESPONSE_ERROR).json({ message: 'Staff member has a conflicting booking' });
                return;
            }
            if (checking[1] == true) {
                res.status(RESPONSE_ERROR).json({ message: 'Room has a conflicting booking' });
                return;
            }

            const insertedItem = await schedule
                .insertOne(newItem)

            res.json(insertedItem);
            return;

        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
