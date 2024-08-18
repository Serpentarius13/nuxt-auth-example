import { type NitroFetchRequest } from "nitropack";

type Path = Exclude<NitroFetchRequest, Request>;
type MaybePromise<T> = T | Promise<T>;

interface Opts<T extends Record<PropertyKey, unknown>> {
  path: Path;
  onSuccess?: (data: T) => MaybePromise<void>;
  onError?: (err: unknown) => MaybePromise<void>;
}

export const useMutation = <T extends Record<PropertyKey, unknown>>({
  path,
  onSuccess,
  onError,
}: Opts<T>) => {
  const isLoading = ref(false);
  const error = ref<string>();

  const handleMutate = async (data: T) => {
    isLoading.value = true;
    $fetch(path, {
      method: "POST",
      body: data,
    })
      .then(async (res) => {
        await onSuccess?.(res as T);
      })
      .catch((err) => {
        error.value = err.data.message;
        onError?.(err);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return {
    isLoading,
    error,
    handleMutate,
  };
};
