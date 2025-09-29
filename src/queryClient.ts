import { QueryClient, DefaultOptions } from "@tanstack/react-query";

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
    suspense: false,
  } as any,
  mutations: {
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
