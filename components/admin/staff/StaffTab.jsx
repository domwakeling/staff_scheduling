import { useState } from 'react';
import fetcher from '../../../lib/fetcher';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import StaffCard from './StaffCard';
import StaffModal from './StaffModal';
import useSWR from 'swr';

const useStaff = () => {
    const { data, error } = useSWR(`/api/staff/getAll`, fetcher)

    return {
        staff: data,
        isLoading: !error && !data,
        isError: error
    }
}

const StaffTab = () => {

    const { staff, isLoading, isError } = useStaff()
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const addButtonHandler = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    if (isLoading) return <CircularProgress />

    if (isError) return <p>Error: {error.message}</p>

    return (
        <>
            <Grid container spacing={2}>
                {staff.map((staffMember) => (
                    <Grid item key={staffMember._id} xs={12} md={6} lg={4} xl={3}>
                        <StaffCard key={staffMember._id} member={staffMember}/>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Fab color='primary' aria-label='Add' onClick={addButtonHandler}>
                    <AddIcon />
                </Fab>
            </Box>
            <StaffModal handleModalClose={handleModalClose} modalOpen={modalOpen}/>
        </>
    )
}

export default StaffTab;
