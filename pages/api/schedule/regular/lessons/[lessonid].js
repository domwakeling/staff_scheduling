import { MAIN_DB_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../../../lib/constants';
import clientPromise from '../../../../../lib/database';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {

    const { lessonid } = req.query;

    if (req.method == 'GET') {

        const client = await clientPromise;
        const db = client.db(MAIN_DB_NAME);
        const schedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);

        try {
            const lessonObjectId = new ObjectId(lessonid);
            const foundBookings = await schedule.find({ lesson: lessonObjectId }).toArray();
            res.json(foundBookings);
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
