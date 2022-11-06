import fetcher from "./fetcher";
import useSWR from "swr";

const useStaff = () => {
    const { data, error } = useSWR(`/api/staff/getAll`, fetcher)

    return {
        staff: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default useStaff;
