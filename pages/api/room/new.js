import { MAIN_DB_NAME, ROOM_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {

    const { name, email, telephone } = req.body;

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
