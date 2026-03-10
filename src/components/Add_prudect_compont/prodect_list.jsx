import { useEffect, useState } from "react";

export const ProductLists = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.Name}</h2>
            <div className="flex gap-2 mt-2">
              {product.Colors.map((color, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: color }}
                  className="w-6 h-6 rounded-full border"
                />
              ))}
            </div>
            <div className=" gap-2 mt-2">
              {product.Images.map((img, i) => (
                <img
                  key={i}
                  src={img} // Base64 أو رابط
                  alt={`product ${i}`}
                  className="w-[140px] h-[80px] object-contain rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
