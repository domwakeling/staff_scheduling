import { MAIN_DB_NAME, STAFF_COLLECTION_NAME, RESPONSE_ERROR } from '../../../lib/constants';
import clientPromise from '../../../lib/database';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {

    const { staffid } = req.query;

    // Get the database and collection
    const client = await clientPromise;
    const db = client.db(MAIN_DB_NAME);
    const staff = db.collection(STAFF_COLLECTION_NAME);

    // GET method
    if (req.method == 'GET') {
        try {
            const staffObjectId = new ObjectId(staffid);
            const foundStaff = await staff.findOne({_id: staffObjectId});
            res.json(foundStaff);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    if (req.method =='DELETE') {
        try {
            const staffObjectId = new ObjectId(staffid);
            const deletedStaff = await staff.deleteOne({ _id: staffObjectId });
            res.json(deletedStaff);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    if (req.method == 'PUT') {
        // get the new details
        const { name, email, telephone } = req.body;

        // protect against a bad request
        if (!name || !email || !telephone || name == '' || email == '' || telephone == '') {
            res.status(RESPONSE_ERROR).json({ message: '400: Bad Request: Required fields missing' });
            return;
        }

        try {
            const staffObjectId = new ObjectId(staffid);
            const updatedStaff = await staff.updateOne(
                { _id: staffObjectId },
                {$set: { name, email, telephone}});
            res.json(updatedStaff);
            return;
        } catch (err) {
            res.status(RESPONSE_ERROR).json({ message: err.message });
            return;
        }
    }

    res.status(RESPONSE_ERROR).json({ message: 'Method not supported' });
};

export default handler;
