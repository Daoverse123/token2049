import React from "react";

function Footer() {
  return (
    <div className="flex w-full h-14 items-center border-t-2 border-[#BF1C97] ">
      <div className="flex w-full h-full bg-white mt-2 items-center ">
        <span className="flex w-[1300px] mx-auto">
          <picture>
            <img
              className="w-[211px] max-[768px]:w-[100px]"
              src="/logo.png"
              alt=""
            />
          </picture>
          <p></p>
        </span>
      </div>
    </div>
  );
}

export default Footer;
