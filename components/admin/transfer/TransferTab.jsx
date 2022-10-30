import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { json2csv } from '../../../lib/json_csv';
import TransferRow from './TransferRow';
import Typography from '@mui/material/Typography';
import useStaff from '../../../lib/db_staff';
import useRooms from '../../../lib/db_rooms';
import useLessons from '../../../lib/db_lessons';

const TransferTab = (props) => {

    const { snackbarUse } = props;

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
            snackbarUse({ severity: 'success', message: 'Download successful' });
        } catch (err) {
            // failure => show the message, don't clear or close the modal
            snackbarUse({
                severity: 'error',
                message: (err.response && err.response.data && err.response.data.message) || err.message
            });
        }
    }

    const regularUploadHandler = (event) => {
        snackbarUse({ severity: 'info', message: 'Upload functionality to be completed'})
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography noWrap variant="h5" component="h2">
                                    Recurring Schedule
                                </Typography>
                            }
                            noWrap
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
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography noWrap variant="h5" component="h2">
                                    Weekly Schedules
                                </Typography>
                            }
                            noWrap
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
                                disabled
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* <StaffModal
                closeHandler={handleModalClose}
                modalOpen={modalOpen}
                modalMode={modalMode}
                snackbarUse={snackbarUse}
                staffName={staffName}
                setName={setStaffName}
                email={staffEmail}
                setEmail={setStaffEmail}
                tel={staffTel}
                setTel={setStaffTel}
                id={staffId}
            /> */}
            {/* <StaffRemoveDialog
                dialogCloseHandler={handleDialogClose}
                dialogOpen={dialogOpen}
                snackbarUse={snackbarUse}
                id={staffId}
            /> */}
        </>
    )
}

export default TransferTab;