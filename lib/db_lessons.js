import fetcher from "./fetcher";
import useSWR from "swr";

const useLessons = () => {
    const { data, error } = useSWR(`/api/lesson/getAll`, fetcher)

    return {
        lessons: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default useLessons;
