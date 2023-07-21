import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask, updateTask } from "../api";
import { toast } from "react-toastify";

export const useAddEditLog = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState({});

  const { mutate } = useMutation(
    async (payload: any) => {
      const { createdAt, PK, ...rest } = payload;
      const response = await addTask({ ...rest });
      return response;
    },
    {
      onSuccess: (data, context) => {
        setData(data);

        queryClient.resetQueries([`getAllTask`], {
          exact: true,
        });
        toast.success(
          ` ${context?.taskId ? "Updated" : "Added"} Successfully`,
          {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            closeButton: false,
          }
        );
        return data;
      },
      retry: false,
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { mutate, data };
};
