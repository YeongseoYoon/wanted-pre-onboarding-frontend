import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../useAxios";
import { SignUpRequest } from "../../types/auth";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [request, { response, error }] = useAxios<SignUpRequest, null>();
  useEffect(() => {
    if (response?.status === 201) {
      alert("회원가입 되었습니다.");
      navigate("/signin");
    } else if (error) {
      alert(error);
    }
  }, [response, error, navigate]);
  const handleSignup = async ({ email, password }: SignUpRequest) => {
    try {
      if (!email || !password) {
        alert("입력되지 않은 항목이 있습니다.");
      }
      request("post", "auth/signup", { email, password });
    } catch (error) {
      alert(error);
    }
  };
  return handleSignup;
};

export default useSignUp;
