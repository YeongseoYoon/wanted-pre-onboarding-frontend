import useInput from "../../hooks/useInput";
import useSignIn from "../../hooks/useSignIn";

function SignIn() {
  const {
    value: email,
    setValue: setEmail,
    isError: isEmailError,
  } = useInput({
    regex: /@/,
    initialValue: "",
  });
  const {
    value: password,
    setValue: setPassword,
    isError: isPasswordError,
  } = useInput({
    regex: /^.{8,}$/,
    initialValue: "",
  });
  const isFormValid = !isEmailError && !isPasswordError;

  const handleSignIn = useSignIn();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignIn({ email, password });
  };
  return (
    <>
      <h1 className="text-xl font-bold">Sign In</h1>
      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          data-testid="email-input"
          type="email"
          placeholder="이메일을 입력해주세요."
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={`p-2 rounded ${
            isEmailError
              ? "border border-red-500 border-solid"
              : "border border-gray-400 border-solid"
          }`}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          data-testid="password-input"
          type="password"
          placeholder="최소 8자 이상 입력해주세요."
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={`p-2 rounded ${
            isPasswordError
              ? "border border-red-500 border-solid"
              : "border border-gray-400 border-solid"
          }`}
        />
        <button
          type="submit"
          disabled={!isFormValid}
          data-testid="signin-button"
          className={`p-2 text-white rounded-md ${
            isFormValid
              ? "bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          로그인
        </button>
      </form>
    </>
  );
}
export default SignIn;
