import fetcher from "../lib/fetcher";
import useSWR from "swr";

const useRooms = () => {
    const { data, error } = useSWR(`/api/room/getAll`, fetcher)

    return {
        rooms: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default useRooms;
