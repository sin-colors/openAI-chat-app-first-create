import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-blue-300">
      <div className="flex h-40 w-2xl flex-col justify-center gap-10 text-3xl font-bold text-zinc-700">
        <h1 className="mb-5 pr-14 text-center">AI Chat App</h1>
        <div className="flex items-center gap-6">
          <p>アカウントをお持ちでない場合は</p>
          <Link
            href={"/signup"}
            className="group transition-color relative text-blue-50 duration-500 hover:text-blue-600"
          >
            アカウント作成へ
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-blue-600 transition-transform duration-500 group-hover:scale-x-100"></span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <p>アカウントをすでにお持ちの場合は</p>
          <Link
            href={"/login"}
            className="group transition-color relative text-blue-50 duration-500 hover:text-blue-600"
          >
            ログインへ
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-blue-600 transition-transform duration-500 group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
