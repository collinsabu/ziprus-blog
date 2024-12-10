"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaLinkedin, FaShareAlt } from "react-icons/fa";
import moment from "moment";
import demoImage from "@/public/img/demo_image.jpg";

const BlogPage = () => {
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
        setBlogs(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching blogs:", err);
          setError("Unable to load blogs at the moment. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    // Clean up on unmount
    return () => controller.abort();
  }, []);

  const handleShare = (blog) => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: blog.category,
          url: `https://ziprus-blog.vercel.app/blog/${blog._id}`,
        })
        .then(() => console.log("Blog shared successfully"))
        .catch((err) => console.error("Error sharing the blog:", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const renderBlogDetailsOnImage = (blog) => {
    const timeStr = blog?.createdAt;
    const time = moment(timeStr);
    const formattedTime = time.format("MMMM Do YYYY");

    return (
      <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold">{blog?.title}</h2>
        <p className="text-sm">{blog?.category}</p>
        <div className="flex items-center text-xs mt-1">
          <AiTwotoneCalendar />
          <span className="ml-2">{formattedTime}</span>
        </div>
        <button
          className="mt-2 flex items-center bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
          onClick={() => handleShare(blog)}
        >
          <FaShareAlt className="mr-2" />
          Share
        </button>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Blogs - Latest Updates</title>
        <meta
          name="description"
          content="Explore the latest blogs and updates on various topics. Stay informed with our curated articles."
        />
        <meta name="keywords" content="blogs, articles, updates, news, technology" />
        <meta name="author" content="Ziprus Blog" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="relative h-[400px] md:h-[500px] col-span-2 bg-gray-200 rounded-lg animate-pulse"></div>
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

        {!loading && error && <div className="text-center text-red-600">{error}</div>}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="relative h-[400px] md:h-[500px] col-span-2">
              <Link href={`/blog/${blogs[0]?._id}`}>
                <div className="relative h-full w-full">
                  <Image
                    src={blogs[0]?.image?.url || demoImage}
                    alt={blogs[0]?.title || "Blog"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  {renderBlogDetailsOnImage(blogs[0])}
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {blogs.slice(1, 3).map((blog) => (
                <div key={blog._id} className="relative h-[190px] md:h-[240px]">
                  <Link href={`/blog/${blog._id}`}>
                    <div className="relative h-full w-full">
                      <Image
                        src={blog?.image?.url || demoImage}
                        alt={blog?.title || "Blog"}
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
    </>
  );
};

export default BlogPage;
