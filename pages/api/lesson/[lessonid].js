import { MAIN_DB_NAME, LESSON_COLLECTION_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import Ably from 'ably'; 
import clientPromise from '../../../lib/database';
import { ObjectId } from 'mongodb';
import { ScheduleMessage } from '../../../lib/message';

const handler = async (req, res) => {

    const { lessonid } = req.query;

    // Get the database and collection
    const client = await clientPromise;
    const db = client.db(MAIN_DB_NAME);
    const lessons = db.collection(LESSON_COLLECTION_NAME);

    // GET method
    if (req.method == 'GET') {
        try {
            const lessonObjectId = new ObjectId(lessonid);
            const foundLesson = await lessons.findOne({ _id: lessonObjectId });
            res.json(foundLesson);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    if (req.method == 'DELETE') {
        try {
            // delete the lesson from the lessons collection
            const lessonObjectId = new ObjectId(lessonid);
            const deletedLesson = await lessons.deleteOne({ _id: lessonObjectId });

            // delete all entries for the lresson from the regular schedule
            const regularSchedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);
            const deletedClasses = await regularSchedule.deleteMany({ lesson: lessonid });

            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({
                lesson: true,
                regular: {
                    getAll: true
                }
            });
            await channel.publish('lessons collection updated', newMessage);
            ably.close();

            res.json({
                staff: deletedLesson,
                schedule: deletedClasses
            });

            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    if (req.method == 'PUT') {
        // get the new details
        const { name, color } = req.body;

        // protect against a bad request
        if (!name || name == '' || !color || color == '') {
            res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing' });
            return;
        }

        try {
            const lessonObjectId = new ObjectId(lessonid);
            const updatedLesson = await lessons.updateOne(
                { _id: lessonObjectId },
                { $set: { name, color } });
            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({ lesson: true });
            await channel.publish('lessons collection updated', newMessage);
            ably.close();
            // send data back
            res.json(updatedLesson);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
