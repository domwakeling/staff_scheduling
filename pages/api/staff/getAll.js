import * as constants from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {

    try {
        const client = await clientPromise;

        // Get the database and collection
        const db = client.db(constants.MAIN_DB_NAME);
        const staff = db.collection(constants.STAFF_COLLECTION_NAME);

        const allStaff = await staff
            .find({})
            .toArray();

        res.json(allStaff);

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    }
};

export default handler;
