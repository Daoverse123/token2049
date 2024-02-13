import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import useUser from "@/hooks/useUser";
import Auth from "@/components/auth";
import { useQuery } from "wagmi";
import axios from "axios";

function Duplicate() {
  const [size, setsize] = useState<[number | undefined, number | undefined]>([
    0, 0,
  ]);
  const { width, height } = useWindowSize();
  const [showAuth, setshowAuth] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [duplicate, setduplicate] = useState(false);
  useEffect(() => {
    let area = document.querySelector("#area");
    let w = area?.getBoundingClientRect().width;
    let h = area?.getBoundingClientRect().height;
    setsize([h, w]);
  }, [width, height]);

  let { isLogedIn, isLoading, user } = useUser();

  return (
    <div className="flex w-full min-h-screen flex-col items-center">
      {showAuth && <Auth />}
      <Nav showAuth={() => {}} />
      <div className="flex w-full min-h-screen flex-col items-center">
        <div
          id="area"
          className=" mt-[60px] mb-[133px] max-w-[1300px] rounded-[36px]  grid place-items-center relative w-[94%] h-fit overflow-hidden"
        >
          <span className="flex flex-col w-[99.7%] h-[99.6%] bg-white rounded-[36px] px-[48px]  p-[60px]">
            <div className="flex flex-col items-center">
              {isLogedIn && !isLoading && (
                <span className="flex items-center gap-3">
                  <picture className="w-[45.6px] h-[45.6px] bg-yellow-300 rounded-full flex overflow-hidden">
                    <img
                      className="w-[45.6px] h-[45.6px] object-cover"
                      src={user?.photo}
                      alt=""
                    />
                  </picture>
                  <h1 className="text-[24px]">{user?.name}</h1>
                </span>
              )}
              <p className="mt-[30px] max-[768px]:text-center text-2xl font-[500] text-[#400AB9]">
                You have already redeemed your XP. Thank you for participating!
                Stay tuned for more opportunities to earn and redeem points in
                the future.
              </p>
            </div>
            {/* <h1
                onClick={() => {
                  setshowAuth(true);
                }}
                className="gradText text-3xl max-[768px]:text-2xl mx-auto mt-14 font-[700] max-[768px]:text-[10vw] border-[2px] p-4 rounded-lg"
              >
                Login/Sign-up
              </h1> */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Duplicate;
