// catch a call where there is no staffid provided => get a blank return

const handler = async (req, res) => {

    res.json([]);
    return;

};

export default handler;
