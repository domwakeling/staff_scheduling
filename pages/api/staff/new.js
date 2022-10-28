import { MAIN_DB_NAME, STAFF_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';

const handler = async (req, res) => {

    const { name, email, telephone } = req.body;

    // protect against a bad request
    if (!name || !email || !telephone || name == '' || email == '' || telephone == '') {
        res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing'});
        return;
    }

    if (req.method == 'POST') {
        try {
            const client = await clientPromise;

            // Get the database and collection
            const db = client.db(MAIN_DB_NAME);
            const staff = db.collection(STAFF_COLLECTION_NAME);

            const insertedStaff = await staff
                .insertOne({
                    name,
                    email,
                    telephone
                })

            res.json(insertedStaff);
            return;

        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    };

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
}

export default handler;
