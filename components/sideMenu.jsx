"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Side Menu Button */}
      <div
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50"
        style={{ writingMode: "vertical-rl" }}
      >
        <button
          className="px-2 py-4 bg-base_two text-white rounded-r-lg shadow-lg hover:bg-base_color hover:scale-110 transition-transform duration-300 ease-in-out"
          onClick={toggleModal}
        >
          Profile Menu
        </button>
      </div>

      {/* Overlay and Modal */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleModal}
          ></div>

          {/* Modal */}
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-500 ease-in-out ${
              isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-80"
              style={{
                animation: isOpen ? "slideIn 0.4s ease-out" : "slideOut 0.4s ease-in",
              }}
            >
              <h2 className="text-2xl font-semibold text-base_color mb-4 animate-pulse">
                Profile Menu
              </h2>

              <div className="flex flex-col space-y-4">
                {/* Conditional rendering: Show Login and Create Account only if user is not logged in */}
                {!session && (
                  <>
                    <Link href="/login">
                      <button className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color hover:scale-105 transition-transform duration-200 ease-in-out shadow-md">
                        Login
                      </button>
                    </Link>

                    <Link href="/signup">
                      <button className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color hover:scale-105 transition-transform duration-200 ease-in-out shadow-md">
                        Create Account
                      </button>
                    </Link>
                  </>
                )}

                {/* Logout Button */}
                {session && (
                  <button
                    onClick={async () => {
                      await signOut({ callbackUrl: "/" }); // Sign out and redirect to the home page
                    }}
                    className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color hover:scale-105 transition-transform duration-200 ease-in-out shadow-md"
                  >
                    Logout
                  </button>
                )}

                {/* Edit Profile Link */}
                {session?.user?._id && (
                  <Link
                    href={`/user/${session.user._id.toString()}`}
                    className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color hover:scale-105 transition-transform duration-200 ease-in-out shadow-md"
                  >
                    Edit Profile
                  </Link>
                )}
              </div>

              <button
                className="mt-4 text-base_color underline hover:text-base_two transition-colors duration-200"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideMenu;
