import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { json2csv, csv2json } from '../../../lib/json_csv';
import TransferConfirmDialog from './TransferConfirmDialog';
import TransferRow from './TransferRow';
import Typography from '@mui/material/Typography';
import useStaff from '../../../lib/staff_hook';
import useRooms from '../../../lib/rooms_hook';
import useLessons from '../../../lib/lessons_hook';
import { useState } from 'react';

const TransferTab = (props) => {

    const { messageSnackbar } = props;

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState([]);

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogData([]);
    }

    const showDialog = (data) => {
        setDialogData(data);
        setDialogOpen(true);
    }

    const { staff } = useStaff();
    const { rooms } = useRooms();
    const { lessons } = useLessons();

    const regularDownloadHandler = async () => {
        try {
            const allSchedule = await axios.get('/api/schedule/regular/getAll');
            // map to add the names for all
            const modifiedSchedule = allSchedule.data.map(item => {
                const roomName = rooms.filter(i => i._id == item.room)[0].name;
                const lessonName = lessons.filter(i => i._id == item.lesson)[0].name;
                const staffName = staff.filter(i => i._id == item.staff)[0].name;
                return {...item, roomName, lessonName, staffName}
            })
            // convert to csv
            const csv = json2csv(modifiedSchedule);
            // create blob
            const blob = new Blob([csv], { type: 'text/csv' });
            // create object for downloading url
            const url = window.URL.createObjectURL(blob)
            // create a virtual anchor tag
            const a = document.createElement('a')
            // pass the url to virtual anchor
            a.setAttribute('href', url)
            // set the attributes and virtually click
            a.setAttribute('download', 'schedule.csv');
            a.click()
            messageSnackbar({ severity: 'success', message: 'Download successful' });
        } catch (err) {
            // failure => show the message
            messageSnackbar({
                severity: 'error',
                message: (err.response && err.response.data && err.response.data.message) || err.message
            });
        }
    }

    const regularUploadHandler = async (event) => {        
        const reader = new FileReader();
        // write the event listener first ...
        reader.addEventListener('load', async (event) => {
            const csv = event.target.result;
            // replace all \r instances - added when file is opened/saved in spreadsheet
            const jsonData = csv2json(csv.replace(/\r/g, ''));
            showDialog(jsonData);
            // Do something with result
        });
        // then call the reader, which will trigger the 'load' event when complete
        reader.readAsText(event.target.files[0]);
        // finally reset the input value so that we will be able to re-upload again
        event.target.value='';
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography noWrap variant="h5" component="h2">
                                    Recurring Schedule
                                </Typography>
                            }
                            sx={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                display: "block",
                                overflow: "hidden"
                            }}
                        />
                        <CardContent>
                            <TransferRow
                                text="Week A &amp; Week B"
                                downloadHandler={regularDownloadHandler}
                                uploadHandler={regularUploadHandler}
                                inputId={'recurring-schedule-input'}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography noWrap variant="h5" component="h2">
                                    Weekly Schedules
                                </Typography>
                            }
                            sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                color: 'rgba(0, 0, 0, 0.26)',
                                display: "block",
                                overflow: "hidden"
                            }}
                        />
                        <CardContent>
                            <TransferRow
                                text="Not available in demo"
                                downloadHandler={() => {preventDefault: () => {} }}
                                uploadHandler={() => { preventDefault: () => { } }}
                                inputId={'weekly-schedule-input'}
                                disabled
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <TransferConfirmDialog
                dialogCloseHandler={handleDialogClose}
                dialogOpen={dialogOpen}
                messageSnackbar={messageSnackbar}
                data={dialogData}
            />
        </>
    )
}

export default TransferTab;
