import React, { useState } from "react";
import useUser from "@/hooks/useUser";

function Nav({ showAuth }: { showAuth: () => any }) {
  let { isLogedIn, isLoading, user } = useUser();

  return (
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
        {isLogedIn && !isLoading ? (
          <span className="flex items-center gap-2 ml-auto p-2">
            <picture>
              <img className="h-8 w-8 rounded-full" src={user?.photo} alt="" />
            </picture>
            <h1>{user?.name}</h1>
          </span>
        ) : (
          <button
            onClick={() => {
              showAuth();
            }}
            className=" ml-auto px-[28px] py-[9px] bg-[#BF1C97] rounded-[32px]  text-white "
          >
            Log in
          </button>
        )}
      </span>
    </div>
  );
}

export default Nav;
