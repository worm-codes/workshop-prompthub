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
  //sorun db ile ilgiliymis, yeni cluster olusturup onu kullaninca duzeldi
  //bir sonraki derste user a gore gosterim yapilacak
  //post olusturma ekrani yapilacak
  //post olusturulunca db ye kaydedilecek
  //postlarin listelendigi sayfa yapilacak - feed
  //zaman kalirsa profil sayfasi yapilacak
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  console.log(session);

  const isUserLoggedIn = false;
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
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post">Create Post</Link>
            <button
              onClick={() => {
                console.log("sign out");
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
                src="/assets/images/logo.svg"
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
        {isUserLoggedIn ? (
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
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="black_btn w-full text-center mt-5"
                  onClick={() => {
                    console.log("sign out");
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
