"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const users = () => {

    const [data, setData] = useState<any>([]) 
    const [postfix, setPostfix] = useState<boolean>(true)

    const router = useRouter()

    const fetchUsers = async () : Promise<void> => {
        const response = await fetch('/api', {
            cache: "no-cache",
            method: 'GET',
        })
        const data = await response.json()
        if(!response.ok) throw new Error(data.error || "something went wrong")
        console.log(data)
        setData(data)
        setPostfix(false)
    }

    const fetchOneUser =  (id: number) : void => {
        router.push(`/users/${id}`)
    }
    
    return ( 
        <div className="items-center justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="bg-blue-500 font-semibold text-2xl text-white p-4 rounded-t-lg shadow-md ">
                <h2 className="">Welcome to the users page</h2>
            </div>
            <div className=" shadow-sm shadow-gray-500 p-4 rounded-b-lg">
                <div className="flex items-center justify-between">
                    <button onClick={fetchUsers} className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">GET USERS LIST</button>
                    <button onClick= {() => {router.push('/crud')}} className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">CREATE NEW USER</button>
                </div>

                <div className="my-4">
                    <h2 className="text-2xl text-black font-semibold  py-2 ">Users List</h2>
                    {
                      postfix && 
                      <p className="text-gray-500">Click the button above to fetch users</p>   
                    }
                    {
                        data && 
                        data.map((user: any) => (
                        <div key={user.id} className=" flex rounded-md shadow-sm shadow-gray-500 p-4 my-2 bg-white items-center ">
                            <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mt-2" />
                            <div className="flex justify-between w-full ml-4 items-end">
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-2xl text-blue-500 font-semibold  py-2 ">{user.first_name} {user.last_name}</h2>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                                <div className="">
                                    <button onClick={() => fetchOneUser(user.id)} className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300" >VIEW ALONE</button>
                                </div>
                            </div> 
                        </div>
                        ))
                    }
                </div>
            </div>
            
        </div>
     );
}
 
export default users;