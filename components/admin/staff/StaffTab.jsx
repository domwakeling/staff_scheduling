import fetcher from '../../../lib/fetcher';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import StaffCard from './StaffCard';
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

    if (isLoading) return <CircularProgress />

    if (isError) return (
        <p>Error: {error.message}</p>
    )

    return (
        <Grid container spacing={2}>
            {staff.map((staffMember) => (
                <Grid
                    item
                    key={staffMember._id}
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                >
                    <StaffCard key={staffMember._id} member={staffMember}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default StaffTab;
