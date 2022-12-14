import { MAIN_DB_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../../lib/constants';
import Ably from 'ably';
import { checkDouble } from '../../../../lib/check_double';
import clientPromise from '../../../../lib/database';
import { ScheduleMessage } from '../../../../lib/message';

const handler = async (req, res) => {

    const { staffid, lessonid, roomid, start, end, day, week } = req.body;

    const startFloat = parseFloat(start);
    const endFloat = parseFloat(end);

    const isValid = (str) => !(!str || str == '');

    if (!startFloat || !endFloat || !isValid(staffid) || !isValid(lessonid) || !isValid (roomid) || !isValid(day) || !isValid(week)) {
        res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing' });
        return;
    }

    const newItem = {
        start: startFloat,
        end: endFloat,
        day: day,
        staff: staffid,
        room: roomid,
        lesson: lessonid,
        week: week
    };

    if (req.method == 'POST') {

        try {
            const client = await clientPromise;

            // Get the database and collection
            const db = client.db(MAIN_DB_NAME);
            const schedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);

            // check if there is a conflict and if so report it
            const checking = await checkDouble(schedule, staffid, roomid, day, startFloat, endFloat, week);
            if (checking[0] == true) {
                res.status(RESPONSE_ERROR).json({ message: 'Staff member has a conflicting booking' });
                return;
            }
            if (checking[1] == true) {
                res.status(RESPONSE_ERROR).json({ message: 'Room has a conflicting booking' });
                return;
            }

            const insertedItem = await schedule
                .insertOne(newItem);
            
            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({
                regular: {
                    days: [day],
                    rooms: [roomid],
                    staff: [staffid]
                }
            });
            await channel.publish('rooms collection updated', newMessage);
            ably.close();

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
