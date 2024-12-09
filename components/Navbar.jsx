"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import demoImage from "@/public/img/demo_image.jpg"; // Update the path to your demo image if necessary

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function fetchUser() {
    if (!session?.user?._id) return; // Ensure we fetch only if the user is logged in
    try {
      const res = await fetch(`/api/user/${session.user._id}`); // Replace localhost with your production URL if necessary
      const resData = await res.json();
      setUserData(resData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [session?.user?._id]);

  return (
    <nav className="bg-base_color py-4 px-4 sm:px-10">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <h2 className="text-white text-lg font-bold">
            Ziprus<span className="text-base_text">Blog</span>
          </h2>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="text-white text-2xl sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-6">
          <li>
            <Link
              href="/"
              className={
                pathname === "/" ? "text-base_text font-bold" : "text-white"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/all-post"
              className={
                pathname === "/all-post"
                  ? "text-base_text font-bold"
                  : "text-white"
              }
            >
              All-Post
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={
                pathname === "/about"
                  ? "text-base_text font-bold"
                  : "text-white"
              }
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="https://www.zipruschemicals.com"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              ZiprusChemical
            </Link>
          </li>
          {/* Profile Image for Logged-In User */}
          {session?.user && (
            <li>
              <Link href={`/user/${session.user._id.toString()}`}>
                <Image
                  src={userData?.avatar?.url || demoImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col items-start bg-base_color p-4 sm:hidden space-y-4">
          <li>
            <Link
              href="/"
              className={
                pathname === "/" ? "text-base_text font-bold" : "text-white"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/all-post"
              className={
                pathname === "/all-post"
                  ? "text-base_text font-bold"
                  : "text-white"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              All-Post
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={
                pathname === "/about"
                  ? "text-base_text font-bold"
                  : "text-white"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="https://www.zipruschemicals.com"
              className="text-white"
              onClick={() => setIsMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              ZiprusChemical
            </Link>
          </li>
          {session?.user && (
            <li>
              <Link href={`/user/${session.user._id.toString()}`}>
                <Image
                  src={userData?.avatar?.url || demoImage}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
