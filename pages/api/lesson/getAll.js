import { MAIN_DB_NAME, LESSON_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {

    if (req.method == 'GET') {
        try {
            const client = await clientPromise;

            // Get the database and collection
            const db = client.db(MAIN_DB_NAME);
            const lessons = db.collection(LESSON_COLLECTION_NAME);

            const allLessons = await lessons
                .find({})
                .toArray();

            res.json(allLessons);
            return;

        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
