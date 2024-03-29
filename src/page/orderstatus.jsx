import React, { useState } from "react";
// import { useForm } from 'react-hook-form';
import PropTypes from "prop-types";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function OrderStatus({ theme, handleToggle }) {
  OrderStatus.propTypes = {
    theme: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired,
  };

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const parameter = {
        order_id: search
    };

    const payload = await fetch("https://backend-follower-f8a6bb63a58e.herokuapp.com/api/v1/payment/status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parameter),
    });

    const response = await payload.json();
    setIsLoading(false);
    console.log(response.result);
  };


  return (
    <div className={`${theme === "light" ? "bg-slate-100" : "bg-gray-800"}`}>
      <Navbar theme={theme} handleToggle={handleToggle} />
      <div className="w-full h-screen flex flex-col">
        <div className="w-full h-40 flex justify-center items-center">
          <div className="flex gap-2">
            <input
              value={search}
              onChange={handleSearch}
              type="search"
              placeholder="Input Order"
              className="w-96 h-10 border-2 rounded-md bg-slate-100 border-gray-200 outline-none p-2 text-gray-500"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-10 h-10 ${theme === "light" ? "bg-navlight" : "bg-navdark"} rounded-md flex justify-center items-center`}
            >
              {isLoading ? (<span className="loading loading-spinner loading-md bg-white"></span>) : ( 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffff" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div>card</div>
      </div>
      <Footer theme={theme} />
    </div>
  );
}
