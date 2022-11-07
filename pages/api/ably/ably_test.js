import Ably from 'ably';
import { ScheduleMessage } from '../../../lib/message';

const handler = async (req, res) => {

    const ably = new Ably.Realtime.Promise('rcpH_g.K31FhQ:VU49wuwOkfpZqFlqnIOnvYslrX1pHDmfaAsD_jsWjAg');
    await ably.connection.once('connected');
    console.log('Connected to Ably!');

    const channel = ably.channels.get('update-published');
    
    const newMessage1 = new ScheduleMessage({});
    await channel.publish('message1', newMessage1);

    const newMessage2 = new ScheduleMessage({
        room: '123456789',
        regular: {
            getAll: true
        }
    });
    await channel.publish('message1', newMessage2);

    ably.close(); // runs synchronously
    console.log('Closed the connection to Ably.');

    
    res.json({ message: 'message published?'});
    return;
}

export default handler;
