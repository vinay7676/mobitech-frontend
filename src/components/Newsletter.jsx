import React from 'react';
import logo from '../assets/news.jpg'; // make sure this path is correct

export default function Newsletter() {
    return (
        <div className="md:grid md:grid-cols-2 max-w-4xl bg-gray-100 mx-4 md:mx-auto rounded-xl mt-20 shadow-lg ">
            <img
                src={logo}
                alt="newsletter"
                className="hidden md:block w-full max-w-lg rounded-xl object-contain p-4"
            />

            <div className="relative flex items-center justify-center">
                <button className="absolute top-6 right-6" aria-label="Close">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13 2 2 13M2 2l11 11"
                            stroke="#1F2937"
                            strokeOpacity=".7"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="max-md:py-20 px-6 md:px-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Subscribe to Our Newsletter
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Get the latest updates, app features, and exclusive offers directly to your inbox!
                    </p>
                    <form className="mt-8 flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full outline-none rounded-l-md border border-r-0 border-gray-300 p-4 text-gray-900"
                        />
                        <button
                            type="submit"
                            className="rounded-r-md bg-blue-600 px-7 py-2 text-white hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
