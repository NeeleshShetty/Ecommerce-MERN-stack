import { useEffect, useState } from "react";
import Product from "../components/Product";
const Home = () => {
 
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
   try {
     const fetchData = async () => {
       const res = await fetch(`/api/products`)
       const data = await res.json()
       setProducts(data)
       setIsLoading(false)
     }
     fetchData()
   } catch (error) {
    console.log(error.message);
   }
  }, [])
  

  return (
    <>
      {isLoading ? (
        <h1 className="text-center text-3xl h-[100vh] mt-52">Loading...</h1>
      ) : (
        <>
          <div className="grid grid-cols-2  sm:grid-cols-1 md:grid-cols-3 gap-4 ">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded shadow">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
