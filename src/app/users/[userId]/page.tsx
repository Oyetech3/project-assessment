"use client"

import LoadingSpinner from "@/app/Loading";
import { useEffect, useState } from "react";

const userid =  ({params} : {params : Promise<{userId : number | any}>})  => {
    const [data, setData] = useState<any>(null)
    const [userId, setUserId] = useState<number | any>(null)

    //const userId =  params.userId


    useEffect(() => {
        params.then((res) => {
            setUserId(res.userId)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [params])               
    
    useEffect(() => {
        const fetchUser = async (id : number) : Promise<void> => {
            try {
                const response = await fetch(`/api/${id}`, {
                    cache: "no-cache",
                    method: 'GET',
                })
                const {data} = await response.json()
                if(!response.ok) throw new Error(data.error || "something went wrong")
                setData(data)
            }
            catch(err : any) {
                console.log(err.message)
            }
        }
        fetchUser(userId)
    }, [userId]) 
    return ( 
        <div className="items-center justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-bold">Single View</h1>
            
            {
                data ? 
                <div key={data.id} className=" flex rounded-md shadow-sm shadow-gray-500 p-4 my-2 bg-white items-center ">
                            <img src={data.avatar} alt={data.first_name} className="w-24 h-24 rounded-full mt-2" />
                            <div className="flex justify-between w-full ml-4 items-end">
                                <div className=" justify-center">
                                    <h2 className="text-2xl text-blue-500 font-semibold  py-2 ">{data.first_name} {data.last_name}</h2>
                                    <p className="text-gray-500">{data.email}</p>
                                </div>
                                
                            </div> 
                        </div> : 
                        <div className="my-3">
                            <LoadingSpinner/>
                        </div>
            }

        </div>
     );
}
 
export default userid;