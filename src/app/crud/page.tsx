"use client"

import { useState } from "react"

const createUser = () => {

    const [name, setName] = useState<string>("")
    const [job, setJob] = useState<string>("")
    const [data, setData] = useState<any[]>([])
    const [created, setCreated] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    const [editId, setEditId] = useState<number | null>(null) 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<any> => {
        e.preventDefault()
        const response = await fetch('/api', {
            cache: "no-cache",
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, job}),
        })
        const data = await response.json()
        
        if(!response.ok) throw new Error(data.error || "something went wrong")
        setCreated(true)
        setData((prevData) => [...prevData, data])
        setName("")
        setJob("")
        console.log(data)
    }

    const handleEdit = (id: number) : void => {
        setEditId(id)
        setName(data[id].name)
        setJob(data[id].job)
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) : Promise<any> => {
        e.preventDefault()
        if(editId === null) return

        const response = await fetch(`/api/${data[editId].id}`, {
            cache: "no-cache",
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, job}),
        })
        const updatedData = await response.json()
        
        if(!response.ok) throw new Error(updatedData.error || "something went wrong")
        setCreated(true)
        setEditId(null)
        setData((prevData) => prevData.map((user, index) => index === editId ? {...user, ...updatedData} : user))
        setName("")
        setJob("")
        console.log(data)
    }

    const handleDelete = async (index: number) : Promise<any> => {
        const isComfirmed = confirm("Are you sure you want to delete")
        if(!isComfirmed) return

        console.log(data[index].id)
        const response = await fetch(`/api/${data[index].id}`, {
            cache: "no-cache",
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
        const deletedData = response.status !== 204 ? await response.json() : {}
        
        if(!response.ok) throw new Error(deletedData.error || "something went wrong")
        setData((prevData) => prevData.filter((user, key) => key !== index))
        setDeleted(true)
        console.log("User deleted successfully", deletedData)
    }


    return ( 
        <div className="items-center justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">

            <h1 className="text-2xl font-bold">{ editId === null ? "Create New User" : "Edit User"}</h1>

            {
                created && 
                <div role="alert" className="flex justify-between items-center bg-green-500 text-white p-4 rounded-md shadow-md mt-4">
                    <p className="italic">{editId === null ? "New User created successfully" : "User Updated Successfully"}</p>
                    <button onClick={() => setCreated(false)} className="px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button> 
                </div>
            }

            {
                deleted && 
                <div role="alert" className="flex justify-between items-center bg-green-500 text-white p-4 rounded-md shadow-md mt-4">
                    <p className="italic">User Deleted Successfully</p>
                    <button onClick={() => setDeleted(false)} className="px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button> 
                </div>
            }

            <form onSubmit={editId === null ? handleSubmit : handleUpdate} className="flex flex-col gap-4 mt-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" className="border border-gray-300 p-2 rounded-md" />
                <input type="text" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Enter Job" className="border border-gray-300 p-2 rounded-md" />
                
                <button type="submit" className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">{editId === null ? "Create User" : "Update User"}</button>
            </form>

            {
                data.length > 0  && (
                    <div>
                        <h1 className="text-2xl font-bold mt-4">Newly Created Users</h1>
                        {
                            data.map((user: any, index: number) => (
                                <div key={index} className="flex justify-between rounded-md shadow-sm shadow-gray-500 p-4 my-2 bg-white items-center">
                                    <div>
                                        <p  className="font-semibold">Name: <span className="font-normal">{user.name}</span></p>
                                        <p className="font-semibold">Job: <span className="font-normal">{user.job}</span></p>
                                        <p className="font-semibold">Created at: <span className="font-normal">{user.createdAt}</span></p>
                                    </div>
                                    
                                    <div className="flex flex-col  gap-2">
                                        <button onClick={() => handleEdit(index)} className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300" >EDIT</button>
                                        <button onClick={() => handleDelete(index)} className="bg-red-500 cursor-pointer text-white p-2 rounded-md hover:bg-red-600 transition duration-300">DELETE</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
                
            }
            
        </div>
     );
}
 
export default createUser;