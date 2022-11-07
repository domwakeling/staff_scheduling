import { MAIN_DB_NAME, LESSON_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import Ably from 'ably';
import clientPromise from '../../../lib/database';
import { ScheduleMessage } from '../../../lib/message';

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

            // check if there's already a lesson by that name
            const nameExists = await lessons.findOne({ name });
            
            if (nameExists) {
                res.status(RESPONSE_ERROR).json({ message: 'A lesson by that name already exists' });
                return;
            }

            const insertedLesson = await lessons
                .insertOne({
                    name,
                    color
                })
            
            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({lesson: true});
            await channel.publish('lessons collection updated', newMessage);
            ably.close();

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
