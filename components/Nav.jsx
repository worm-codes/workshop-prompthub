"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const {
  signOut,
  signIn,
  useSession,
  getProviders,
} = require("next-auth/react");

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    handleProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        href="/"
        className="flex gap-2 pt-3"
      >
        <Image
          width={30}
          height={30}
          alt="logo"
          src="/assets/images/logo.svg"
          className="object-contain"
        />
      </Link>
      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn"
            >
              Create Post
            </Link>
            <button
              onClick={() => {
                signOut();
              }}
              className="outline_btn"
            >
              Sign out
            </button>
            <Link href="/profile">
              <Image
                width={37}
                height={37}
                alt="profile"
                src={session?.user.image}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex cursor-pointer">
            <Image
              width={37}
              height={37}
              alt="profile"
              src="/assets/images/logo.svg"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="black_btn w-full text-center mt-5"
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                console.log("sign in");
              }}
              className="black_btn"
            >
              Sign in with google
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
