import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { instance } from "../apis/api";

type MethodType = "get" | "post" | "put" | "delete";

interface UseAxiosState<R> {
  loading: boolean;
  error?: any;
  response?: AxiosResponse<R>;
}

type UseAxiosResult<T, R> = [
  (method: MethodType, url: string, data?: T) => void,
  UseAxiosState<R>
];

const useAxios = <T, R>(): UseAxiosResult<T, R> => {
  const [state, setState] = useState<UseAxiosState<R>>({
    loading: false,
    error: undefined,
    response: undefined,
  });

  const request = async (method: MethodType, url: string, data?: T) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response: AxiosResponse<R> = await instance.request({
        method: method,
        url: url,
        data: data,
      });

      setState({
        loading: false,
        response,
        error: null,
      });
    } catch (error: AxiosError | any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message,
      }));
    }
  };

  return [request, { ...state }];
};

export default useAxios;
