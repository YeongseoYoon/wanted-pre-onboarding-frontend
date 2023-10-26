# Todo List

## 프로젝트 소개

- 로그인 및 회원가입 기능을 포함하여 사용자가 개인적으로 접근할 수 있는 투두리스트를 생성할 수 있는 사이트

## 데모 영상

[배포 링크(현재 원티드에서 제공하는 서버가 중단되어 api 요청 불가)](https://wanted-pre-onboarding-frontend-bice.vercel.app/)

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

## 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┃ ┗ 📜api.ts
 ┣ 📂components
 ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜Layout.tsx
 ┃ ┗ 📜ToDoItem.tsx
 ┣ 📂constants
 ┃ ┗ 📜constants.ts
 ┣ 📂hooks
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜useAuth.ts
 ┃ ┃ ┣ 📜useSignIn.ts
 ┃ ┃ ┗ 📜useSignUp.ts
 ┃ ┣ 📂todo
 ┃ ┃ ┣ 📜useCheckbox.ts
 ┃ ┃ ┣ 📜useCreateToDo.ts
 ┃ ┃ ┣ 📜useDeleteToDo.ts
 ┃ ┃ ┣ 📜useGetToDo.ts
 ┃ ┃ ┗ 📜useUpdateToDo.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜useAxios.ts
 ┃ ┗ 📜useInput.ts
 ┣ 📂pages
 ┃ ┣ 📂error
 ┃ ┃ ┗ 📜ErrorBoundary.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜Home.tsx
 ┃ ┣ 📂sign-in
 ┃ ┃ ┗ 📜SignIn.tsx
 ┃ ┣ 📂sign-up
 ┃ ┃ ┗ 📜SignUp.tsx
 ┃ ┣ 📂todo
 ┃ ┃ ┗ 📜ToDo.tsx
 ┃ ┗ 📜index.ts
 ┣ 📂router
 ┃ ┗ 📜Router.tsx
 ┣ 📂types
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜todo.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜index.tsx
```

## Assignment별 구현 방식

### Assignment 1. 유효성 검사

- 이메일과 비밀번호는 정규표현식을 사용해 유효성 검증하도록 했습니다.
- 이메일과 비밀번호를 제어하는 커스텀 훅 useInput() 을 통해 유효성 검증 오류 시 isError 를 반환하고 이메일과 비밀번호에 에러가 모두 아닌경우에만 버튼의 disabled 속성 해제되도록 했습니다.

```ts
//useInput(선언부)
interface UseInputProps<V> {
  regex: RegExp;
  initialValue: V;
}

export const useInput = <V>({ regex, initialValue }: UseInputProps<V>) => {
  const [value, setValue] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (typeof value === "string") setIsError(!regex.test(value));
  }, [value, regex]);

  return { value, setValue, isError };
};

export default useInput;

//SignIn 페이지(호출부)
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
```

### Assignment 2 & 3. 페이지 이동/ jwt 관리

- 커스텀 훅 useAxios를 통해 request 함수와 response , error 를 반환하게 하고, useAxios훅을 가공한 useSignUp, useSignIn 커스텀훅을 통해 요청하도록 했습니다.
- useNavigate() 를 이용해 response.status에 따라 페이지 이동 처리하고, 에러시 에러 응답 메시지를 alert()했습니다.
- 요구사항에 따라, 로그인 성공시 localStorage에 accessToken를 저장하도록 했습니다.
- axios 인터셉터에서, 만약 토큰이 있을 시 header에 authorization 토큰을 설정해 보내도록 했습니다.

```ts
//useAxios

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
```

### Assignment 4. 리다이렉트

- Header 컴포넌트에 useAuth 커스텀 훅을 사용해 인증토록 했습니다.
- useLocation 과 useNavigate 를 통해, 현재 accessToken이 있고 현재 location이 “/”, “/signup”, “/signin”이면 “/todo”로 리다이렉트, accessToken이 없고 location이 “/todo”라면 “/signin”으로 리다이렉트 했습니다.
- useAuth 훅을 사용시에 인증 확인 후 리다이렉트 시 깜빡임 문제가 있어 <Navigate/> 컴포넌트를 반환해(HOC) 깜빡임을 제거하는 **리팩토링**을 실행했습니다.

```ts
//수정 전의 useAuth 훅
export const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token && ["/", "/signin", "/signup"].includes(location.pathname)) {
      navigate("/todo");
    } else if (!token && location.pathname === "/todo") {
      navigate("/signin");
    }
  }, [navigate, token, location]);
};

export default useAuth;

//수정 후, Header 컴포넌트

const Header = () => {
  const location = useLocation();

  const token = localStorage.getItem("access_token");

  if (!token && location.pathname === "/todo") {
    return (
      <>
        <Navigate to="/signin" />
      </>
    );
  } else if (token && ["/", "/signin", "/signup"].includes(location.pathname)) {
    return (
      <>
        <Navigate to="/todo" />
      </>
    );
  } else {
    return <Outlet />;
  }
};

export default Header;
```

### Assignment 5. 투두 리스트 목록과 체크박스

- useAxios 커스텀 훅을 useGetToDo과 훅에서 호출해 사용하고, useGetToDo과 훅에서는 handleGetToDo 훅과 todos을 반환합니다.
- useEffect에서는 isCreated, isDeleted, isUpdated, isChecked 를 의존성 배열에 넣어 상태가 변할때마다 handleGetToDo 훅이 호출되도록 했습니다.(즉 처음 접속시 데이터의 변경이 없다면 1회 호출)
- TodoItem 컴포넌트를 분리, ToDo 페이지에서 Props를 통해 todo의 상태를 전달합니다.

### Assignment 6. 투두 리스트 추가

- Assignment 5에서의 useGetToDo과 비슷하게 동작하는 useCreateToDo훅을 구현했습니다.
- 서버와 클라이언트 상태 일치를 위해 post 요청 후 받은 todo 응답 값을 리렌더링하도록 했습니다.

### Assignment 7&10 투두리스트,체크박스 수정

- Assignment 5에서의 useGetTodo과 비슷하게 동작하는 useCheckbox, useUpdateToDo훅을 구현했습니다.
- handleUpdateToDo와 handleCheckbox를 TodoItem 컴포넌트에 Props로 넘겨주어 컴포넌트에서 수정상태와 체크박스 체크상태 핸들링하도록 했습니다.

### Assignment 8 & Assignment 9 투두리스트 삭제

- Assignment 5에서의 useGetTodo과 비슷하게 동작하는 useDeleteToDo훅을 구현했습니다.

### 기타사항

- 수정 또는 삭제 시, "수정하시겠습니까?" 또는 "삭제하시겠습니까?"의 confirm 메시지를 띄워 유저의 의사를 재확인하도록 했습니다.
