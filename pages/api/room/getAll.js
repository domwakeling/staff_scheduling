import { MAIN_DB_NAME, ROOM_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {

    try {
        const client = await clientPromise;

        // Get the database and collection
        const db = client.db(MAIN_DB_NAME);
        const rooms = db.collection(ROOM_COLLECTION_NAME);

        const allRooms = await rooms
            .find({})
            .toArray();

        res.json(allRooms);

    } catch (err) {
        res.status(RESPONSE_ERROR).json({ message: err.message });
    }
};

export default handler;
