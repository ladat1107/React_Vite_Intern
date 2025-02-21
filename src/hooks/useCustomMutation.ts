import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCustomMutation<TData = any, TVariables = any, TError = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation({
    mutationFn,
    onError: (error: any) => {
     console.error(error);
    },
    ...options,
  });
}
