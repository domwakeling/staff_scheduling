import * as constants from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {
    
    // const { limit, showOver, skip } = req.body;

    try {
        const client = await clientPromise;

        // Get the database and collection
        const db = client.db(constants.MAIN_DB_NAME);
        const staff = db.collection(constants.STAFF_COLLECTION_NAME);

        const userInserted = await staff
            .insert({
                name: 'Jackie Robinson',
                email: 'jackie@gmail.com',
                telephone: '012 345 6789'
            })

        res.json(userInserted);

    } catch (err) {
        res.status(constants.REPONSE_ERROR).json({ message: err.message });
    }
};

export default handler;
