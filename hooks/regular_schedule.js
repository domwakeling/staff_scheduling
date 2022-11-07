import fetcher from "../lib/fetcher";
import useSWR from "swr";

export const useRegularStaff = (staffid) => {
    const { data, error } = useSWR(`/api/schedule/regular/staff/${staffid}`, fetcher)

    return {
        regularStaff: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useRegularRooms = (roomid) => {

    const { data, error } = useSWR(`/api/schedule/regular/rooms/${roomid}`, fetcher)

    return {
        regularRooms: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useRegularDays = (day) => {

    const { data, error } = useSWR(`/api/schedule/regular/day/${day}`, fetcher)

    return {
        regularDays: data,
        isLoading: !error && !data,
        isError: error
    }
}
