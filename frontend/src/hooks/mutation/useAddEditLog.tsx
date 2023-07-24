import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask, updateTask } from "../../api";
import { toast } from "react-toastify";

export const useAddEditLog = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState({});
  let response;
  const { mutate } = useMutation(
    async (payload: any) => {
      const { createdAt, ...rest } = payload.payload;
      if (payload?.taskId) {
        response = await updateTask({ ...rest }, payload?.taskId);
      } else response = await addTask({ ...rest });
      return response;
    },
    {
      onSuccess: (data, context) => {
        setData(data);
        if (context?.taskId) {
          queryClient.setQueryData([`getAllTask`], (oldData: any) => {
            const { patch, ...temp } = context.payload;
            const updatedData = oldData.map((item: any) => {
              if (item._id === data.existingTask._id) {
                return {
                  ...item,
                  ...temp,
                };
              }
              return item;
            });

            return updatedData;
          });
        } else {
          queryClient.resetQueries([`getAllTask`], {
            exact: true,
          });
        }

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
