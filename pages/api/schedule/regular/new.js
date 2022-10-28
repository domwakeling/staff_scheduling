import { MAIN_DB_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../../lib/constants';
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
