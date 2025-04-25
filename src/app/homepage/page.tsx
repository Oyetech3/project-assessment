"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

const homepage = () => {
    const router = useRouter()

    const logout = () : void => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        router.push('/login')
    }
    return ( 
        <div className="items-center  justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="bg-blue-500 font-semibold text-2xl text-white p-4 rounded-t-lg shadow-md ">
                <h2 className="">Welcome to the homepage</h2>
            </div>
            <div className="flex items-center justify-between shadow-sm shadow-gray-500 p-4 rounded-b-lg">
                <div className="flex justify-start gap-12 pr-2">
                    <div>
                        <Link href={'/myaccount'}>MY ACCOUNT</Link>
                    </div>
                    <div>
                        <Link href={'/users'}>USERS</Link>
                    </div>
                </div>
                <div>
                    <button onClick={logout} className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">LOG OUT</button>
                </div>
            </div>
            
        </div>
     );
}
 
export default homepage;