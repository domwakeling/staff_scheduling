import { MAIN_DB_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../../lib/constants';
import Ably from 'ably';
import clientPromise from '../../../../lib/database';
import { ObjectId } from 'mongodb';
import { ScheduleMessage } from '../../../../lib/message';

const handler = async (req, res) => {
    
    // data has been checked in the client for validity/schedule clashes prior to upload

    if (req.method == 'POST') {

        try {
            const { jsonData } = req.body;

            const uploadData = jsonData.map(item => ({
                start: parseFloat(item.start),
                end: parseFloat(item.end),
                day: item.day,
                staff: item.staff,
                room: item.room,
                lesson: item.lesson,
                week: item.week
            }))

            const isValid = (str) => !(!str || str == '');

            let dataValid = true;

            uploadData.forEach(lesson => {
                if (!lesson.start || !lesson.end || !isValid(lesson.staff) || !isValid(lesson.lesson) || !isValid(lesson.room) || !isValid(lesson.day) || !isValid(lesson.week)) {
                    dataValid = false;
                }
            })
            
            if (!dataValid) {
                res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing' });
                return;
            }

            const client = await clientPromise;

            // Get the database and collection
            const db = client.db(MAIN_DB_NAME);
            const schedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);

            // delete the existing schedules
            const deletedClasses = await schedule.deleteMany({});

            // insert the new schedules
            const insertedItems = await schedule.insertMany(uploadData);

            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({
                regular: { getAll: true }
            });
            await channel.publish('rooms collection updated', newMessage);
            ably.close();

            res.json({
                deleted: deletedClasses,
                inserted: insertedItems
            });
            return;

        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
