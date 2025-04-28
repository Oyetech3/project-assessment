import Link from "next/link";

export default function Home() {
  
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Welcome to the project</h1>
      <p className="mt-4">Kindly click the log in button as a user or  register to get started</p>

      <div className="mt-8 flex gap-4">
        <Link href={'/auth/login'} className="bg-blue-500 text-white py-3  px-5 rounded-md hover:bg-blue-600 transition duration-300">Log In </Link>
        <Link href={'/auth/register'} className="bg-blue-500 text-white py-3 px-5 rounded-md hover:bg-blue-600 transition duration-300"> Register</Link>
      </div>
    </div>
  );
}
