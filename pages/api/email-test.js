import { RESPONSE_ERROR } from '../../lib/constants';
import nodemailer from 'nodemailer';

const handler = async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_ACCOUNT,
        to: 'domwakeling@gmail.com',
        subject: 'email test',
        text: 'Test email using an end-point'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.warn(err);
            res.status(RESPONSE_ERROR).json({message: err.message});
        } else {
            console.log('Email sent: ', info.response);
        }   res.json(info);
    });

}

export default handler;
