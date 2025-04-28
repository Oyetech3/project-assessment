"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const register: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)

    const router = useRouter()

    const validate = () : string =>  {
        if(!email.includes('@')) return "Please enter a valid email address"
        if(password.length < 8) return "Password must be at least 8 characters long"
        if(password !== confirmPassword) return "Passwords do not match"
        if(!/[0-9]/.test(password)) return "Password must contain a number"
        if(!/[@#$%^&*]/.test(password)) return "Password must contain at least one special character"
        if(!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter"
        return ""
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void>  =>  {
        e.preventDefault()
        const errorMessage = validate()
        if(errorMessage) {
            setError(errorMessage)
            return
        }

        try {
            const response = await fetch('https://reqres.in/api/register', {
                cache: 'no-cache',
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({email,password})
            })

            const data = await response.json()
            if(!response.ok) throw new Error(data.error || "something went wrong")
                setSuccess(true)
                setError('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')

                console.log(data)
                router.push('/login')
        }
        catch(err : any) {
            return setError(err)
        }
    }

    return ( 
        <div className="items-center justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl text-blue-500 font-bold text-center">Register Page</h1>
            <p className="text-center mt-3">Please enter your credentials</p>

            {
                error && 
                <div className="flex justify-between items-center w-full p-2 mt-4 bg-red-200 rounded-md" role="alert">
                    <p className="pl-3">{error}</p>
                    <button onClick={() => setError('')} className="px-3 py-1 rounded-md hover:bg-red-300 cursor-pointer transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button> 
                </div>
            }

            {
                success && 
                <div className="flex justify-between items-center w-full p-2 mt-4 bg-green-200 rounded-md" role="alert">
                    <p className="pl-3">Registration successful</p>
                    <button onClick={() => setSuccess(false)} className="mx-2 px-3 py-1 rounded-md hover:bg-green-300 cursor-pointer transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            }
            
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border border-gray-300 rounded-md p-2 mt-4 w-full" required />

                <div className="relative mt-4">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border border-gray-300 rounded-md p-2 mt-4 w-full" autoComplete="new-password" required />
                    <p className="absolute text-gray-400 right-3 top-10 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "HIDE" : "SHOW"}</p>
                </div>
                
                <div className="relative mt-4">
                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Comfirm Password" className="border border-gray-300 rounded-md p-2 mt-4 w-full " autoComplete="new-password" required />
                    <p className="absolute text-gray-400 right-3 top-10 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "HIDE" : "SHOW"}</p>
                </div>

                <div className="flex items-end justify-between mt-4">
                    <button type="submit" className="bg-blue-500 mr-4 cursor-pointer text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition duration-300">Register</button>
                    <Link href={'/auth/login'} className="">Already registerd ? <span className="text-blue-500">Login</span></Link>
                </div>
                
            </form>
        </div>
     );
}
 
export default register;