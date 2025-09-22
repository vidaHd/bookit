import {
  useQuery,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

const fetcher = async ({
  url,
  method = "GET",
  body,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}) => {
  const token = localStorage.getItem("token") || "";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  console.log(res);

  if (!res.ok) {
    let errorMessage = `Error ${res.status}`;
    try {
      const data = await res.json();
      errorMessage = data.error || data.message || errorMessage;
    } catch {
      const text = await res.text();
      if (text) errorMessage = text;
    }
    throw new Error(errorMessage);
  }
  return res.json();
};

export const useApiQuery = <T>({
  key,
  url,
  method = "GET",
  body,
  options,
}: {
  key: string | unknown[];
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  options?: any;
}) => {
  return useQuery<T, Error>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => fetcher({ url, method, body }),
    ...options,
  });
};

export const useApiMutation = <T, U>({
  url,
  method = "POST",
  options,
}: {
  url: string;
  method?: "POST" | "PUT" | "DELETE";
  options?: UseMutationOptions<T, Error, U>;
}): UseMutationResult<T, Error, U> => {
  return useMutation<T, Error, U>({
    mutationFn: (body: U) => fetcher({ url, method, body }),
    ...options,
  });
};
