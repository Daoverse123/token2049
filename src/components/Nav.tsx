import React, { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { Close, Hamburger } from ".././svgs";
import { create } from "zustand";
import Auth from "@/components/auth";

interface NavStore {
  openNav: boolean;
  showAuth: boolean;
  setOpenNav: (st: boolean) => void;
  setShowAuth: (st: boolean) => void;
}

const useNavStore = create<NavStore>()((set) => ({
  openNav: false,
  showAuth: false,
  setShowAuth: (st) =>
    set({
      showAuth: st,
    }),
  setOpenNav: (st) =>
    set({
      openNav: st,
    }),
}));

function Nav() {
  let { isLogedIn, isLoading, user } = useUser();
  let { openNav, setOpenNav, showAuth, setShowAuth } = useNavStore();

  return (
    <>
      {showAuth && (
        <Auth
          close={() => {
            setShowAuth(false);
          }}
        />
      )}
      <div className="shadow-lg mt-[60px] h-[100px] w-[98%] max-w-[1300px] rounded-[36px] outline-[#BF1C97] outline outline-2 grid place-items-center max-[768px]:h-16 max-[768px]:w-[94%] max-[768px]:mt-4">
        <span className="flex w-[99.7%] h-[96%] bg-white rounded-[36px] px-[48px] items-center max-[768px]:px-4">
          {/* logo */}
          <picture
            onClick={() => {
              location.href = "/";
            }}
            className="cursor-pointer"
          >
            <img
              className="w-[211px] object-contain max-[768px]:w-[100px]"
              src="/logo.png"
              alt=""
            />
          </picture>
          {/* nav items */}
          <span className="flex gap-6 ml-[62px] max-[768px]:hidden">
            {["Home", "Missions", "Speakers"].map((item) => {
              return (
                <p className="text-[20px] font-[500]" key={item + "nav"}>
                  {item}
                </p>
              );
            })}
          </span>
          {/* Get started */}
          <span
            className="ml-auto"
            onClick={() => {
              setOpenNav(true);
            }}
          >
            <Hamburger />
          </span>
        </span>
        {openNav && <MobileMenu />}
      </div>
    </>
  );
}

function MobileMenu() {
  let { isLoading, isLogedIn, user, logout } = useUser();
  let { openNav, setOpenNav, setShowAuth } = useNavStore();

  let menu = [
    "home",
    "leaderboard",
    "profile",
    "rewards",
    "floorplan",
    "logout",
  ];

  if (!isLogedIn) {
    menu = ["home", "leaderboard", "rewards", "floorplan"];
  }

  return (
    <div className="p-6 z-10 flex flex-col fixed top-0 left-0 w-full h-screen bg-white">
      <div className="w-full flex">
        <span className="flex justify-between w-full">
          {!isLoading && isLogedIn && (
            <span
              onClick={() => {
                location.href = "/profile";
              }}
              className="flex items-center h-min gap-3"
            >
              <picture>
                <img
                  className="w-[49px] h-[49px] rounded-full"
                  src={user?.photo}
                  alt=""
                />
              </picture>
              <h1 className="text-[16px]">{user?.name}</h1>
            </span>
          )}
          {!isLogedIn && (
            <span className="flex items-center h-min gap-3">
              <button
                onClick={() => {
                  setShowAuth(true);
                }}
                className="px-4 h-8 bg-[#BF1C97] text-white rounded-xl"
              >
                Login
              </button>
            </span>
          )}
        </span>
        <span
          onClick={() => {
            setOpenNav(false);
          }}
          className="cursor-pointer ml-auto"
        >
          <Close />
        </span>
      </div>
      <div className="flex flex-col items-center gap-6 mt-16">
        {menu.map((ele, idx) => {
          return (
            <p
              style={ele == "logout" ? { color: "red" } : {}}
              className="text-[22.7px] uppercase cursor-pointer"
              key={ele + idx}
              onClick={() => {
                if (ele == "logout") {
                  return logout();
                }
                if (ele == "floorplan") {
                  return window.open("/floorplan", "_blank");
                } else {
                  return (location.href = `/${ele}`);
                }
              }}
            >
              {ele}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Nav;
