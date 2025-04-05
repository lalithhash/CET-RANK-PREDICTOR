const PageNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
       
      </div>
    );
  };
  
  export default PageNotFound;
  