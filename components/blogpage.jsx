"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiTwotoneCalendar } from "react-icons/ai";
import moment from "moment";
import demoImage from "@/public/img/demo_image.jpg";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://ziprus-blog.vercel.app/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs.");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Unable to load blogs at the moment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const renderBlogDetailsOnImage = (blog) => {
    const timeStr = blog?.createdAt;
    const time = moment(timeStr);
    const formattedTime = time.format("MMMM Do YYYY");

    return (
      <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold ">{blog?.title}</h2>
        <p className="text-sm text-base_text">{blog?.category}</p>
        <div className="flex items-center text-xs mt-1">
          <AiTwotoneCalendar />
          <span className="ml-2 ">{formattedTime}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Skeleton for Main Blog */}
          <div className="relative h-[400px] md:h-[500px] col-span-2 bg-gray-200 rounded-lg animate-pulse"></div>
          {/* Skeleton for Side Blogs */}
          <div className="flex flex-col gap-6">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="relative h-[190px] md:h-[240px] bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-600">{error}</div>
      )}

      {!loading && !error && blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Blog Post */}
          <div className="relative h-[400px] md:h-[500px] col-span-2">
            <Link href={`/blog/${blogs[0]?._id}`}>
              <div className="relative h-full w-full">
                <Image
                  src={blogs[0]?.image?.url || demoImage}
                  alt="First Blog"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {renderBlogDetailsOnImage(blogs[0])}
              </div>
            </Link>
          </div>

          {/* Side Blog Posts */}
          <div className="flex flex-col gap-6">
            {blogs.slice(1, 3).map((blog) => (
              <div key={blog._id} className="relative h-[190px] md:h-[240px]">
                <Link href={`/blog/${blog._id}`}>
                  <div className="relative h-full w-full">
                    <Image
                      src={blog?.image?.url || demoImage}
                      alt={blog?.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    {renderBlogDetailsOnImage(blog)}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
