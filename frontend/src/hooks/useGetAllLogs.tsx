import { useQuery } from "@tanstack/react-query";
import { getAllTask } from "../api";

export const useGetAllLogs = () => {
  const { data: allTimeLogs, refetch } = useQuery(
    [`getAllTask`],
    async () => {
      const res = await getAllTask();
      return res?.TaskData;
    },
    {
      initialData: [],
      retry: false,
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return {
    allTimeLogs,
    refetch,
  };
};
