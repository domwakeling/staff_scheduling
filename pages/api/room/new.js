import { MAIN_DB_NAME, ROOM_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import Ably from 'ably';
import clientPromise from '../../../lib/database';
import { ScheduleMessage } from '../../../lib/message';

const handler = async (req, res) => {

    const { name } = req.body;

    // protect against a bad request
    if (!name || name == '' ) {
        res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required field missing' });
        return;
    }

    if (req.method == 'POST') {
        try {
            const client = await clientPromise;

            // Get the database and collection
            const db = client.db(MAIN_DB_NAME);
            const rooms = db.collection(ROOM_COLLECTION_NAME);

            // check if there's already a room by that name
            const nameExists = await rooms.findOne({ name });
            if (nameExists) {
                res.status(RESPONSE_ERROR).json({ message: 'A room by that name already exists' });
                return;
            }

            const insertedRoom = await rooms
                .insertOne({
                    name
                })

            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({ room: true });
            await channel.publish('rooms collection updated', newMessage);
            ably.close();

            res.json(insertedRoom);
            return;

        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
