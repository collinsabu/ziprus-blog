"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextArea from "@/components/TextArea";
import Image from "next/image";

const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "General",
  photo: "",
};

const CreateBlog = () => {
  const CLOUD_NAME = "dphzjpw3y";
  const UPLOAD_PRESET = "blog_images";

  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base_color my-10">
      <div className="text-center">
        {/* Spinner Animation */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 sm:h-24 sm:w-24 text-base_text animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2v2m6.364 1.636l-1.414 1.414m4.95 4.95h-2M18 12l-1.636 1.636M12 20v2m-6.364-1.636l1.414-1.414M2 12h2M6.364 6.364L7.778 4.95"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <div className="text-4xl sm:text-6xl font-bold text-base_text animate-pulse">
          loading...
        </div>
      </div>
    </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-700">Access denied. Please log in to continue.</p>
      </div>
    );
  }

  const handleChange = (event) => {
    setError("");
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { photo, title, category, description, excerpt, quote } = state;

    // Form validation
    if (!title || !description || !category || !excerpt || !quote) {
      setError("All fields are required.");
      return;
    }

    if (photo) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (photo.size > maxSize) {
        setError("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    if (title.length < 4 || description.length < 20 || excerpt.length < 10 || quote.length < 6) {
      setError("Ensure all fields meet the minimum length requirements.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      const image = await uploadImage();

      const newBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId: session?.user?._id,
      };

      const response = await fetch("/api/blog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(newBlog),
      });

      if (response?.status === 201) {
        setSuccess("Blog created successfully.");
        setTimeout(() => {
          router.push("/all-post");
        }, 1500);
      } else {
        setError("Error occurred while creating the blog.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the blog.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async () => {
    if (!state.photo) return null;

    const formData = new FormData();
    formData.append("file", state.photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return {
        id: data["public_id"],
        url: data["secure_url"],
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container max-w-3xl mx-auto p-6 bg-base_color my-10">
      <h2 className="text-3xl font-bold mb-5 text-base_text">Create Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow-md rounded-lg">
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder="Enter the blog title..."
          onChange={handleChange}
          value={state.title}
          required
        />

        <TextArea
          label="Description"
          rows="4"
          name="description"
          placeholder="Write the blog description..."
          onChange={handleChange}
          value={state.description}
          required
        />

        <TextArea
          label="Excerpt"
          rows="2"
          name="excerpt"
          placeholder="Enter a short excerpt..."
          onChange={handleChange}
          value={state.excerpt}
          required
        />

        <TextArea
          label="Quote"
          rows="2"
          name="quote"
          placeholder="Enter a key quote..."
          onChange={handleChange}
          value={state.quote}
          required
        />

        <div>
          <label className="block font-medium mb-2 text-black">Category</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block w-full p-3 rounded-lg border-gray-300"
          >
            <option value="General">General</option>
            <option value="Calcium">Calcium</option>
            <option value="Industries">Industries</option>
            <option value="Solid Minerals">Solid Minerals</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2 text-black">Upload Image</label>
          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image/*"
            className="block w-full"
          />

          {state.photo && (
            <div className="mt-3">
              <Image
                src={URL.createObjectURL(state.photo)}
                alt="Preview"
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}

        <button
          type="submit"
          className={`btn w-full p-3 rounded-lg text-white ${
            isLoading ? "bg-gray-500" : "bg-base_two hover:bg-base_text"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create Blog"}
        </button>
      </form>
    </section>
  );
};

export default CreateBlog;
