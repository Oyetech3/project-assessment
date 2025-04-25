const notFound = () => {
    return ( 
        <div className="items-center text-center justify-center m-auto w-2/3 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="text-gray-500 mt-3">The page you are looking for does not exist.</p>
            <p className="text-gray-500 mb-3">Please check the URL or return to the homepage.</p>
            <button className="bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 mt-4">Go to Homepage</button>
        </div>
     );
}
 
export default notFound;