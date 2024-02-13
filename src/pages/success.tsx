import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import useUser from "@/hooks/useUser";
import Footer from "@/components/Footer";
import Rings from "@/components/Rings";

function Success() {
  const [size, setsize] = useState<[number | undefined, number | undefined]>([
    0, 0,
  ]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    let area = document.querySelector("#area");
    let w = area?.getBoundingClientRect().width;
    let h = area?.getBoundingClientRect().height;
    setsize([h, w]);
  }, [width, height]);

  let { isLogedIn, isLoading, user } = useUser();

  return (
    <div className="flex w-full min-h-screen flex-col items-center">
      <Nav showAuth={() => {}} />
      <div className="flex w-full min-h-screen flex-col items-center">
        <div
          id="area"
          className="mt-[5px] mb-[20px] max-w-[1300px]   grid place-items-center relative h-fit overflow-hidden"
        >
          {/* <Confetti width={size[1]} height={size[0]} numberOfPieces={100} /> */}
          <span className="flex flex-col w-[99.7%] h-[99.6%] bg-white rounded-[36px] px-[12px]  p-[60px]">
            <div className="flex relative flex-col items-center">
              {isLogedIn && !isLoading && (
                <span className="flex flex-col items-center gap-3">
                  <picture className="w-[45.6px] h-[45.6px] bg-yellow-300 rounded-full flex overflow-hidden">
                    <img
                      className="w-[70.6px] h-[70.6px] object-cover"
                      src={user?.photo}
                      alt=""
                    />
                  </picture>
                  <h1 className="text-[24px]">{user?.name}</h1>
                </span>
              )}
              <p className="mt-[20px] text-[18px] text-center">
                Congratulations, you`ve earned{" "}
                <span className="text-[#BF1C97]">200 XPs</span> for completing
                the mission!
              </p>
              <span className="absolute max-[768px]:block">
                <Rings />
              </span>
            </div>
            <span className="flex  flex-col max-[768px]:gap-2  justify-center  mt-6  max-[768px]:ml-0 max-[768px]:flex-row max-[768px]:items-center">
              <p className="text-[16px] min-[768px]:text-center font-semibold max-[768px]:text-[16px] text-[#400AB9] max-[768px]:text-sm max-[375px]:text-xs">
                Powered by
              </p>
              <picture className="flex min-[768px]:justify-center">
                <img
                  src="https://sweatco.in/static/media/header__logo.1fc7a1ce.svg"
                  alt=""
                  style={{
                    filter: "invert(0.3)",
                  }}
                  className=" h-[39.5.3px] max-[768px]:w-[178px] mt-1"
                />
              </picture>
            </span>
            <span className="flex flex-col w-full max-[768px]:w-[260px] mx-auto">
              <h1 className="text-[20px] mt-6">Level 15</h1>
              <span className="flex max-[768px]:flex-col items-center gap-4">
                <div className="flex  w-full  h-[11.29px] bg-[#EEEFF2] rounded-full">
                  <span className="flex w-[50%] h-full bg-[#2A0CCF] rounded-full"></span>
                </div>
                <h1 className="text-[18px] font-light min-w-fit">
                  1000 / 1500{" "}
                  <span className="text-[#2A0CCF] ml-3 font-semibold">
                    +200 XPs
                  </span>
                </h1>
              </span>
            </span>
            <span className="flex flex-col items-center mt-8">
              <h1 className="text-[44px] max-[768px]:text-[28px]">
                What’s Next?
              </h1>
              <p className="text-[26px] max-[768px]:text-[16px]">
                Listen to other Speaker Sessions:
              </p>
              <picture>
                <img
                  alt=""
                  src="https://truts-event.s3.ap-south-1.amazonaws.com/event-random-3.webp"
                  className="flex mt-4 bg-black w-full rounded-[14px]"
                />
              </picture>
            </span>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Success;
