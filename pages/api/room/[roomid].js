import { MAIN_DB_NAME, ROOM_COLLECTION_NAME, REGULAR_SCHEDULE_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import Ably from 'ably';
import clientPromise from '../../../lib/database';
import { ObjectId } from 'mongodb';
import { ScheduleMessage } from '../../../lib/message';

const handler = async (req, res) => {

    const { roomid } = req.query;

    // Get the database and collection
    const client = await clientPromise;
    const db = client.db(MAIN_DB_NAME);
    const rooms = db.collection(ROOM_COLLECTION_NAME);

    // GET method
    if (req.method == 'GET') {
        try {
            const roomObjectId = new ObjectId(roomid);
            const foundRoom = await rooms.findOne({ _id: roomObjectId });
            res.json(foundRoom);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    if (req.method == 'DELETE') {
        try {
            // delete the room from the rooms collection
            const roomObjectId = new ObjectId(roomid);
            const deletedRoom = await rooms.deleteOne({ _id: roomObjectId });

            // delete all entries for the room from the regular schedule
            const regularSchedule = db.collection(REGULAR_SCHEDULE_COLLECTION_NAME);
            const deletedClasses = await regularSchedule.deleteMany({ room: roomid });

            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({
                room: true,
                regular: {
                    rooms: [roomid]
                }
            });
            await channel.publish('rooms collection updated', newMessage);
            ably.close();

            res.json({
                staff: deletedRoom,
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
        const { name } = req.body;

        // protect against a bad request
        if (!name || name == '') {
            res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required field missing' });
            return;
        }

        try {
            const roomObjectId = new ObjectId(roomid);
            const updatedRoom = await rooms.updateOne(
                { _id: roomObjectId },
                { $set: { name } });

            // message to Ably
            const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
            await ably.connection.once('connected');
            const channel = ably.channels.get('update-published');
            const newMessage = new ScheduleMessage({ room: true });
            await channel.publish('rooms collection updated', newMessage);
            ably.close();

            res.json(updatedRoom);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
