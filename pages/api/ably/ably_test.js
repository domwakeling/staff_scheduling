import Ably from 'ably';
import { ScheduleMessage } from '../../../lib/message';

const handler = async (req, res) => {

    const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY_ROOT);
    await ably.connection.once('connected');
    console.log('Connected to Ably!');

    const channel = ably.channels.get('update-published');
    
    // const newMessage1 = new ScheduleMessage({});
    // await channel.publish('message1', newMessage1);

    const newMessage2 = new ScheduleMessage({
        room: true,
        staff: true,
        lesson: true,
        regular: {
            staff: ['staff1'],
            days:  ['Monday', 'Tuesday'],
            rooms: ['room1', 'room2', 'room3']
        }
    });
    await channel.publish('message1', newMessage2);

    ably.close(); // runs synchronously
    console.log('Closed the connection to Ably.');

    
    res.json({ message: 'message published?'});
    return;
}

export default handler;
