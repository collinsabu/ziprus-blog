"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen(!isOpen);

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
  };

  return (
    <>
      {/* Side Menu Button */}
      <div
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50"
        style={{ writingMode: "vertical-rl" }}
      >
        <button
          className="px-2 py-4 bg-base_two text-white rounded-r-lg shadow-lg hover:bg-base_color"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>

          {/* Modal */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-80">
              <h2 className="text-xl font-semibold text-base_color">
                Profile Menu
              </h2>

              <div className="flex flex-col space-y-4">
                <Link href="/login">
                  <button className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color">
                    Login
                  </button>
                </Link>

                <button
                  onClick={async () => {
                    await signOut({ callbackUrl: "/" }); // Sign out and redirect to the home page
                  }}
                  className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color"
                >
                  Logout
                </button>

                <Link href="/signup">
                  <button className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color">
                    Create Account
                  </button>
                </Link>

                {/* Conditional rendering for Edit Profile link */}
                {session?.user?._id && (
                  <Link
                    href={`/user/${session.user._id.toString()}`}
                    className="btn w-full bg-base_two text-white py-2 rounded hover:bg-base_color"
                  >
                    Edit Profile
                  </Link>
                )}
              </div>

              <button
                className="mt-4 text-base_color underline hover:text-base_two"
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
