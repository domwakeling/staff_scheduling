import { MODE_ADD } from '../../../lib/constants';
import Alert from '@mui/material/Alert';
import CustomFab from '../../common/CustomFab';
import Grid from '@mui/material/Grid';
import StaffCard from './StaffCard';
import StaffCardSkeleton from './StaffCardSkeleton';
import StaffModal from './StaffModal';
import StaffRemoveDialog from './StaffRemoveDialog';
import useStaff from '../../../lib/staff_hook';
import { useState } from 'react';

const StaffTab = (props) => {

    const { staff, isLoading, isError } = useStaff()
    const [modalOpen, setModalOpen] = useState(false);
    const [staffName, setStaffName] = useState("");
    const [staffEmail, setStaffEmail] = useState("");
    const [staffTel, setStaffTel] = useState("");
    const [staffId, setStaffId] = useState("");
    const [modalMode, setModalMode] = useState(MODE_ADD);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { messageSnackbar } = props;

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setStaffName('');
        setStaffEmail('');
        setStaffTel('');
        setStaffId('');
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setStaffId('');
    }

    const addButtonHandler = (e) => {
        e.preventDefault();
        setModalMode(MODE_ADD);
        handleModalOpen();
    }

    if (isError) return (
        <Alert severity='error' variant='filled' sx={{ width: '200px' }}>
            Loading error
        </Alert>
    )

    return (
        <>
            <CustomFab addButtonHandler={addButtonHandler} variant="right"/>
            <Grid container spacing={2}>
                { isLoading ? (
                    <Grid item key='skeleton_id' xs={12} md={6} lg={4} xl={3}>
                        <StaffCardSkeleton key="skeleton_id" />
                    </Grid>
                ) : staff.map((staffMember) => (
                    <Grid item key={staffMember._id} xs={12} md={6} lg={4} xl={3}>
                        <StaffCard
                            key={staffMember._id}
                            member={staffMember}
                            setMode={setModalMode}
                            openModal={handleModalOpen}
                            setName={setStaffName}
                            setEmail={setStaffEmail}
                            setTel={setStaffTel}
                            setId ={setStaffId}
                            showDialog={handleDialogOpen}
                        />
                    </Grid>
                ))}
            </Grid>
            <StaffModal
                closeHandler={handleModalClose}
                modalOpen={modalOpen}
                modalMode={modalMode}
                messageSnackbar={messageSnackbar}
                staffName={staffName}
                setName={setStaffName}
                email={staffEmail}
                setEmail={setStaffEmail}
                tel={staffTel}
                setTel={setStaffTel}
                id={staffId}
            />
            <StaffRemoveDialog
                dialogCloseHandler={handleDialogClose}
                dialogOpen={dialogOpen}
                messageSnackbar={messageSnackbar}
                id={staffId}
            />
        </>
    )
}

export default StaffTab;
