"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import demoImage from "@/public/img/demo_image.jpg";
import { AiTwotoneCalendar } from "react-icons/ai";
import moment from "moment";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://ziprus-blog.vercel.app/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data); // Set all blogs
      } catch (err) {
        console.error(err);
        setError("Could not load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto my-10 px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold text-base_two mb-6">All Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg shadow-md h-60 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-300"></div>
                <div className="p-4">
                  <div className="w-2/3 h-4 bg-gray-400 mb-2"></div>
                  <div className="w-full h-3 bg-gray-300"></div>
                </div>
              </div>
            ))
          : blogs.map((blog) => {
              const timeStr = blog?.createdAt;
              const time = moment(timeStr);
              const formattedTime = time.format("MMMM Do YYYY");

              return (
                <div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Link href={`/blog/${blog._id}`}>
                    <div>
                      <Image
                        src={blog.image?.url || demoImage}
                        alt={blog.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center text-xs gap-2 text-base_two">
                          <AiTwotoneCalendar />
                          <span>{formattedTime}</span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>

      {error && (
        <p className="text-red-600 font-light mt-6 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default AllBlogs;
