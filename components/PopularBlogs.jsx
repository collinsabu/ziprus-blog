"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import demoImage from "@/public/img/demo_image.jpg";
import { AiTwotoneCalendar } from "react-icons/ai";
import moment from "moment";

const PopularBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ziprus-blog.vercel.app/api/blog", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setBlogs(data.slice(3, 7));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Could not load popular blogs. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    // Clean up fetch on unmount
    return () => controller.abort();
  }, []);

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg overflow-hidden animate-pulse h-48"
        ></div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto my-16 px-4 py-8 max-w-5xl rounded-lg">
        <h2 className="text-xl font-bold text-primaryColor mb-6">Popular Blogs</h2>
        {renderSkeleton()}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto my-16 px-4 py-8 max-w-5xl rounded-lg">
        <h2 className="text-xl font-bold text-primaryColor mb-6">Popular Blogs</h2>
        <p className="text-red-600 font-light">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-16 px-4 py-8 max-w-5xl rounded-lg">
      <h2 className="text-xl font-bold text-base_two mb-6">Popular News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => {
          const timeStr = blog?.createdAt;
          const time = moment(timeStr);
          const formattedTime = time.format("MMMM Do YYYY");

          return (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/blog/${blog._id}`}>
                <div className="relative">
                  <Image
                    src={blog.image?.url || demoImage}
                    alt={blog.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-center text-xs gap-2 text-base_two mb-2">
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
    </div>
  );
};

export default PopularBlogs;
