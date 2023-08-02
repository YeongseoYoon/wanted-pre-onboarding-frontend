import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1 className="text-xl font-bold">TODO LIST</h1>
      <div className="flex gap-8 mt-20">
        <Link
          to="/signup"
          className="p-2 text-white rounded-md bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
        >
          회원가입
        </Link>
        <Link
          to="/signin"
          className="p-2 text-white rounded-md bg-zinc-500 hover:bg-zinc-300 active:bg-blue-600"
        >
          로그인
        </Link>
      </div>
    </>
  );
}

export default Home;
