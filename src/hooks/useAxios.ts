import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { instance } from "../apis/api";

type MethodType = "get" | "post" | "put" | "delete";

interface UseAxiosState {
  loading: boolean;
  error?: any;
  data?: any;
  response?: any;
}

type UseAxiosResult<T> = [
  (method: MethodType, url: string, data?: T) => void,
  UseAxiosState
];

const useAxios = <T>(): UseAxiosResult<T> => {
  const [state, setState] = useState<UseAxiosState>({
    loading: false,
    data: undefined,
    error: undefined,
    response: undefined,
  });

  const request = async (method: MethodType, url: string, data?: T) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response: AxiosResponse<T> = await instance.request({
        method: method,
        url: url,
        data: data,
      });

      setState({
        data: response.data,
        loading: false,
        response,
        error: null,
      });
    } catch (error: AxiosError | any) {
      setState((prev) => ({ ...prev, loading: false, error }));
    }
  };

  return [request, { ...state }];
};

export default useAxios;
