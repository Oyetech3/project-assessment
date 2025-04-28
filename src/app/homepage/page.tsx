"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Loading";

const homepage = () => {
    const [timeLeft, setTimeLeft] = useState<string>("")
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [locationName, setLocationName] = useState<string>("");

    const router = useRouter()
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/auth/login')
        }
    })
    

    useEffect(() => {
        if (session?.tokenExpiry) {
          const updateTimer = () => {
            const now = Date.now();
            const expiry : any = session.tokenExpiry;
            const diff = expiry - now;
    
            if (diff <= 0) {
              setTimeLeft("Token expired");
              return;
            }
    
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
          };
    
          updateTimer();
          const interval = setInterval(updateTimer, 1000);
          return () => clearInterval(interval);
        }
      }, [session]);


    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              //console.log("Latitude:", lat, "Longitude:", lon);
              
              setLatitude(lat);
              setLongitude(lon);
    
              try {
                const res = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                );
                const data = await res.json();
                console.log(data);
    
                const city =  data.display_name || data.address.county + ", " +  data.address.state
                const country = data.address.country || "";
    
                setLocationName(`${city}, ${country}`);
              } catch (err) {
                console.error("Error fetching location name:", err);
              }
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }, []);

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/auth/login");
    };

    if (status === "loading") {
        return <div><LoadingSpinner/></div>;
    }

    return ( 
        <div className="items-center  justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="bg-blue-500 font-semibold text-2xl text-white p-4 rounded-t-lg shadow-md ">
                <h2 className="">Welcome to the homepage</h2>
                {timeLeft && (
                <div className="text-sm mt-2 bg-blue-600 p-2 rounded-md inline-block">
                Token expires in: {timeLeft}
                </div>
        )}
            </div>
            <div className="shadow-sm shadow-gray-500 p-4 rounded-b-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between ">
                    
                    <div className="flex justify-start items-center gap-12 pr-2">
                        <div>
                            <Link href={'/myaccount'}>MY ACCOUNT</Link>
                        </div>
                        <div>
                            <Link href={'/users'}>USERS</Link>
                        </div>
                    </div>
                    <div className="items-cent">
                      <button onClick={handleLogout} className="bg-blue-500 mt-4 md:mt-0 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">LOG OUT</button>
                    </div>

                </div>
                
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-black font-semibold mt-3 py-2 ">User's Location</h2>
                </div>
                <div className="my-3">
                    {
                        latitude && longitude && locationName ? 
                        <p className="text-gray-500">Your current location is: {locationName}</p> : 
                        <LoadingSpinner/>
                    }
                </div>
                
            </div>
            
        </div>
     );
}
 
export default homepage;