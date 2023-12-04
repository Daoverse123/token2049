import React from "react";

function Footer() {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, #F1A189 0.04%, #DC4CAF 27.89%, #B128D3 60.53%, #5522E5 98.5%)",
      }}
      className="flex w-full border-top h-14 items-center"
    >
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
