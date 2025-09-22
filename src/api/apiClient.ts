import {
  useQuery,
  useMutation,
  QueryClient,
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

  if (!res.ok) throw new Error(`Error ${res.status}`);
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
