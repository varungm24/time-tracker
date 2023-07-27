import { apiUrl } from "./config";

export const apiCall = async (
  url: string,
  options: any,
  queryParams?: Record<string, string>
) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const apiUrlWithParams = queryParams
      ? `${apiUrl}/${url}?${queryString}`
      : `${apiUrl}/${url}`;

    const requestOptions = {
      method: options?.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options?.payload),
    };

    const response = await fetch(apiUrlWithParams, requestOptions);

    if (!response.ok) {
      throw new Error("Failed to get time log");
    }

    try {
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      return response;
    }
  } catch (error) {
    console.error("Error occurred while getting time log:", error);
    throw error;
  }
};

export const addTask = async (payload: any) => {
  return apiCall("task", { method: "POST", payload });
};

// export const getTaskByUser = async (userId: string) => {
//   return apiCall(`${userId}/task`, { method: "GET" });
// };

export const getAllTask = async (queryParams: any) => {
  if (queryParams) {
    return apiCall("task", { method: "GET" }, queryParams);
  } else return apiCall("task", { method: "GET" });
};

export const updateTask = async (payload: any, taskId: any) => {
  return apiCall(`task/${taskId}`, { method: "PUT", payload });
};

export const deleteTask = async (taskId: any) => {
  return apiCall(`task/${taskId}`, { method: "DELETE" });
};

export const getTaskById = async (taskId: any) => {
  return apiCall(`task/${taskId}`, { method: "GET" });
};
