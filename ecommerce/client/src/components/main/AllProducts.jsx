import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import Product from "./Product";

const AllProducts = () => {
  const { allproducts } = useContext(MainContext);

  const [products, setproducts] = useState(allproducts);
  const [range, setrange] = useState(100);
  const [category, setcategory] = useState("all products");
  const [sorted, setsorted] = useState("");

  // Sorting useEffect
  useEffect(() => {
    let sortedprod = [...allproducts]; // Always start from allproducts

    if (sorted === "highest to lowest") {
      sortedprod = sortedprod.sort((a, b) => b.price - a.price);
    }

    if (sorted === "lowest to highest") {
      sortedprod = sortedprod.sort((a, b) => a.price - b.price);
    }

    // Apply category filter and range filter after sorting
    sortedprod = sortedprod.filter(
      (prod) =>
        (category === "all products" ? true : prod.category === category) &&
        prod.price >= range
    );

    setproducts(sortedprod);
  }, [sorted, category, range, allproducts]);

  return (
    <div className="min-h-screen bg-blue-500 text-white flex flex-col gap-10 py-10 px-2">
      <section className="flex flex-col gap-2 items-center shadow-xl py-2">
        <div className="flex flex-wrap justify-center gap-2 items-center">
          <select
            className="outline-none p-2 rounded-lg text-black border-2 border-blue-800 w-[200px]"
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="all products">All products</option>
            <option value="camera">Camera</option>
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
          </select>

          <select
            className="outline-none p-2 rounded-lg text-black border-2 border-blue-800 w-[200px]"
            onChange={(e) => setsorted(e.target.value)}
          >
            <option value="highest to lowest">Highest to lowest</option>
            <option value="lowest to highest">Lowest to highest</option>
          </select>
        </div>

        <div className="w-[400px]">
          <label htmlFor="">Min price : ${range}</label>
          <input
            type="range"
            min={100}
            max={20000}
            value={range}
            onChange={(e) => setrange(e.target.value)}
            className="w-full"
            onInput={(e) => {
              const value = ((e.target.value - 100) / (20000 - 100)) * 100;
              e.target.style.setProperty("--value", `${value}%`);
            }}
          />
        </div>
      </section>

      <section className="flex flex-wrap justify-center gap-4">
        {products.map((data) => {
          return <Product data={data} key={data._id} />;
        })}
      </section>
    </div>
  );
};

export default AllProducts;
