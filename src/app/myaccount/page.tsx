"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const myaccount = () => {
        const {data: session} = useSession({
            required: true,
            onUnauthenticated() {
                router.push('/auth/login')
            }
        })
        
        const [email, setEmail] = useState<string>(session?.user.email || '')
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
            else {
                setError('')
                setSuccess(true)
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            }
        }

    return ( 
        <div className="items-center justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl text-blue-500 font-bold text-center">My Account</h1>
            <p className="text-center mt-3">This is the my account page</p>

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
            
            <div className="mt-4">
                <h2 className="text-2xl text-blue-500 font-semibold px-4 py-2 ">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="flex flex-col mt-2 gap-4 p-4 rounded-md shadow-md shadow-gray-300 ">
                    <label className="text-lg ">Change Your Email</label>
                    <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} className="p-2 border border-gray-300 rounded-md" placeholder="Enter your new email" />
                    
                    <label className="text-lg">Change Your Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} value={password}  onChange={(e) => setPassword(e.target.value)} className="p-2 border border-gray-300 rounded-md w-full" placeholder="Enter your password" />
                        <p className="absolute text-gray-400 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "HIDE" : "SHOW"}</p>
                    </div>

                    <label className="text-lg">Comfirm New Password</label>
                    <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 border w-full border-gray-300 rounded-md" placeholder="Enter your password" />
                        <p className="absolute text-gray-400 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "HIDE" : "SHOW"}</p>
                    </div>
                    
                    <button type="submit" className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">Update Profile</button>
                </form>
            </div>
        </div>
     );
}
 
export default myaccount;