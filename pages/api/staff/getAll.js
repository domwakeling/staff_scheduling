import { MAIN_DB_NAME, STAFF_COLLECTION_NAME, REPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {

    try {
        const client = await clientPromise;

        // Get the database and collection
        const db = client.db(MAIN_DB_NAME);
        const staff = db.collection(STAFF_COLLECTION_NAME);

        const allStaff = await staff
            .find({})
            .toArray();

        res.json(allStaff);

    } catch (err) {
        res.status(REPSONSE_ERROR).json({ message: err.message });
    }
};

export default handler;
