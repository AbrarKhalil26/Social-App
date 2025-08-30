import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(queryKey, endPoint, options) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: getPostDetails,
    select: (data) => data.data,
    ...options,
  });

  async function getPostDetails() {
    return await axios.get(`${import.meta.env.VITE_BASE_URL}${endPoint}`, {
      headers: { token: localStorage.getItem("token") },
    });
  }

  return { data, isLoading, isError, error };
}
