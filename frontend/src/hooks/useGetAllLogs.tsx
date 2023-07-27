import { useQuery } from "@tanstack/react-query";
import { getAllTask } from "../api";

export const useGetAllLogs = (queryParams: any) => {
  const { data: allTimeLogs, refetch } = useQuery(
    [`getAllTask`],
    async () => {
      try {
        let res;
        if (queryParams) {
          res = await getAllTask({ start: queryParams });
        } else {
          res = await getAllTask();
        }

        return res?.taskData;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    {
      initialData: [],
      retry: false,
    }
  );

  return {
    allTimeLogs,
    refetch,
  };
};
