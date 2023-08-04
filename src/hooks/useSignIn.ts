import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { SignInRequest, SignInResponse } from "../types/auth";

export const useSignIn = () => {
  const navigate = useNavigate();
  const [request, { response, error }] = useAxios<
    SignInRequest,
    SignInResponse
  >();
  useEffect(() => {
    if (response?.status === 200) {
      alert("로그인 되었습니다.");
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/todo");
    } else if (error) {
      alert("로그인에 실패하였습니다.");
    }
  }, [response, error, navigate]);

  const handleSignIn = async ({ email, password }: SignInRequest) => {
    try {
      if (!email || !password) {
        alert("입력되지 않은 항목이 있습니다.");
      }
      request("post", "auth/signin", { email, password });
    } catch (error) {
      alert("로그인 중 오류가 발생하였습니다.");
    }
  };
  return handleSignIn;
};

export default useSignIn;
