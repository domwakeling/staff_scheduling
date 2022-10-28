import { MAIN_DB_NAME, LESSON_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {

    const { name, color } = req.body;

    // protect against a bad request
    if (!name || name == '' || !color || color == '') {
        res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing' });
        return;
    }

    if (req.method == 'POST') {
        try {
            const client = await clientPromise;

            // Get the database and collection
            const db = client.db(MAIN_DB_NAME);
            const lessons = db.collection(LESSON_COLLECTION_NAME);

            const insertedLesson = await lessons
                .insertOne({
                    name,
                    color
                })

            res.json(insertedLesson);
            return;

        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
