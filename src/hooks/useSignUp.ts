import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { User } from "../types/auth";
import { useEffect } from "react";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [request, { response, error }] = useAxios<User>();
  useEffect(() => {
    if (response?.status === 201) {
      alert("회원가입 되었습니다.");
      navigate("/signin");
    } else if (error) {
      alert(error);
    }
  }, [response?.data]);
  const handleSignup = async ({ email, password }: User) => {
    try {
      request("post", "auth/signup", { email, password });
    } catch (error) {
      alert(error);
    }
  };
  return handleSignup;
};

export default useSignUp;
