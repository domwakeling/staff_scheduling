import { MAIN_DB_NAME, STAFF_COLLECTION_NAME, REPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {
    
    // const { limit, showOver, skip } = req.body;

    try {
        const client = await clientPromise;

        // Get the database and collection
        const db = client.db(MAIN_DB_NAME);
        const staff = db.collection(STAFF_COLLECTION_NAME);

        const userInserted = await staff
            .insert({
                name: 'Jackie Robinson',
                email: 'jackie@gmail.com',
                telephone: '012 345 6789'
            })

        res.json(userInserted);

    } catch (err) {
        res.status(REPONSE_ERROR).json({ message: err.message });
    }
};

export default handler;
