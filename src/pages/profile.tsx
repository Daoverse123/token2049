import React, { useEffect, useState } from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import useUser from "@/hooks/useUser";
import { Coin } from "@/svgs";
import { xpList, levelList } from "@/xpList";
import axios from "axios";

function Profile() {
  let { isLogedIn, isLoading, user } = useUser();
  const [progress, setprogress] = useState({
    xp: 0,
    level: 0,
    width: 0,
    nextXP: 0,
  });

  const calculateProgress = (totalxp: number) => {
    // @ts-ignore
    let level = 0;
    Object.keys(xpList).forEach((ele, idx) => {
      if (totalxp >= parseInt(ele)) {
        level = xpList[ele].level;
      }
    });
    // @ts-ignore
    let width = (totalxp / levelList[level + 1].xp) * 100;

    setprogress({
      xp: totalxp,
      level: level,
      width: width,
      // @ts-ignore
      nextXP: levelList[level + 1].xp,
    });
  };

  const getXp = async () => {
    let res = await axios(
      `${process.env.API}/listing/${process.env.DAO}/my-xps`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status == 200) {
      calculateProgress(res.data.data.totalListingXP);
    }
  };

  useEffect(() => {
    getXp();
  }, []);

  const LevelCon = () => {
    return (
      <div className="flex flex-col mt-6">
        <span className="flex flex-col relative gap-4  pb-4">
          {/* Completed */}
          <span className="w-[34px] z-0 flex h-full absolute top-[4%] left-[0] justify-center">
            <span className="flex h-full bg-[#2EB70CB2]  w-[2.5px] mx-auto"></span>
          </span>
          {Object.keys(levelList).map((ele, idx) => {
            //@ts-ignore
            let xp = levelList[ele].xp;
            //@ts-ignore
            if (ele >= progress.level) {
              return null;
            }
            return (
              <Level
                key={"c" + idx}
                status="COMPLETED"
                pos={parseInt(ele)}
                xp={xp}
              />
            );
          })}
        </span>
        <span className="flex flex-col  relative pb-4">
          {/* Ongoing */}
          <span className="w-[34px] z-0 flex h-full absolute top-[4%] left-[0] justify-center">
            <span className="flex h-full bg-[#400AB9]  w-[2.5px] mx-auto"></span>
          </span>
          <span className="flex w-full items-center z-10">
            <span className="scale-125">
              <PurpleTick />
            </span>
            <h1 className="text-[#400AB9] text-[24px] ml-[18px]">
              Level {progress.level}
            </h1>
            <p className="text-[#400AB9] text-[24px] ml-auto">
              {progress.xp} XPs
            </p>
          </span>
          <span className="flex flex-col ml-[54px] gap-2 my-3">
            <p className="text-[14px] flex items-center">
              Review speaker sessions:{" "}
              <span className="text-[24px] ml-4">3</span>
            </p>
            <p className="text-[14px] flex items-center">
              Visit sponsor booths: <span className="text-[24px] ml-4">3</span>
            </p>
            <p className="text-[14px] flex items-center">
              Venue specials: <span className="text-[24px] ml-4">1</span>
            </p>
            <span>
              <p className="text-[#BF1C97]">Rewards:</p>
              <h1 className="text-[24px] text-[#5C657D] font-semibold">
                Reward
              </h1>
            </span>
          </span>
        </span>
        <span className="flex flex-col relative gap-4 ">
          {/* Pending */}
          <span className="w-[34px] z-0 flex h-[90%] absolute  left-[0] justify-center">
            <span className="flex h-full bg-[#A4A9B6]  w-[2.5px] mx-auto"></span>
          </span>
          {Object.keys(levelList).map((ele, idx) => {
            //@ts-ignore
            let xp = levelList[ele].xp;
            //@ts-ignore
            if (ele <= progress.level + 1) {
              return null;
            }
            return (
              <Level
                key={"c" + idx}
                status="COMPLETED"
                pos={parseInt(ele)}
                xp={xp}
              />
            );
          })}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full items-center ">
      <Nav />
      <div className="flex flex-col items-center w-full px-4 mb-14 mt-10">
        <div className="flex flex-col w-full p-4 outline outline-[#BF1C97] rounded-lg">
          <span className="mb-3">
            {!isLoading && (
              <picture>
                <img
                  src={user?.photo}
                  className="w-[60.35px] h-[60.35px] rounded-full border-[#e6e6e6] border-4"
                  alt=""
                />
              </picture>
            )}
            <h1 className="text-[20.4px] font-semibold mt-2">
              Satoshi Nakamoto
            </h1>
          </span>
          <Progress progress={progress} />
        </div>

        <div className="flex w-full flex-col ">
          <h1
            style={{
              fontFamily: "Neue",
            }}
            className="text-[#BF1C97] text-[28px] mt-8"
          >
            Your Journey:
          </h1>
          <div className="flex relative mt-6  flex-col w-full p-4 outline outline-[#BF1C97] rounded-lg">
            <h1 className="text-[#5D47FF] text-[16px]">Explore All Rewards</h1>
            <p className="text-[12px] text-[#5C657D] mt-1">
              View reward distribution and XPs for each level as you climb also
              check its requirements click the link below to read the doc.
            </p>
            <button
              onClick={() => {
                location.href = "/rewards";
              }}
              className="bg-[#BF1C97] text-[14px] w-fit px-4 rounded-xl mt-3 h-[40px] text-white"
            >
              Explore Rewards
            </button>
            <span className="absolute right-0 bottom-0">
              <Coin />
            </span>
          </div>
          <LevelCon />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Progress({
  progress,
}: {
  progress: { xp: number; level: number; width: number; nextXP: number };
}) {
  return (
    <span className="flex w-full flex-col">
      <span className="flex items-center gap-2 w-full">
        <h1 className="text-[17px] font-semibold">Level {progress.level}</h1>
        <h1 className="text-[17px] font-normal">
          <span className="text-[#400AB9]">{progress.xp}</span> /{" "}
          {progress.nextXP} XPs
        </h1>
      </span>

      <span className="flex w-full flex-col items-center gap-4 mt-2">
        <div className="flex  w-full  h-[11.29px] bg-[#EEEFF2] rounded-full">
          <span
            style={{
              width: `${progress.width}%`,
            }}
            className="flex transition-all duration-1000 h-full bg-[#2A0CCF] rounded-full"
          ></span>
        </div>
      </span>
    </span>
  );
}

const Level = ({
  status,
  pos,
  xp,
}: {
  status: "COMPLETED" | "ONGOING" | "PENDING";
  pos: number;
  xp: number;
}) => {
  if (status == "PENDING") {
    return (
      <div className="flex flex-col  z-10">
        <span className="flex items-center">
          <Tick completed={false} />
          <h1 className="ml-4 text-[20px] text-[#A4A9B6]">Level {pos}</h1>
          <p className="ml-auto text-[20px] text-[#A4A9B6]"> {xp} XPs</p>
        </span>
      </div>
    );
  } else if (status == "COMPLETED") {
    return (
      <div className="flex flex-col  z-10">
        <span className="flex items-center">
          <Tick completed={true} />
          <h1 className="ml-4 text-[20px] text-[#2EB70CB2]">Level {pos}</h1>
          <p className="ml-auto text-[20px] text-[#2EB70CB2]"> {xp} XPs</p>
        </span>
      </div>
    );
  } else if (status == "ONGOING") {
    return <div>ongoing</div>;
  }
};

function PurpleTick() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bg-white"
    >
      <path
        d="M17 29.75C24.0416 29.75 29.75 24.0416 29.75 17C29.75 9.95837 24.0416 4.25 17 4.25C9.95837 4.25 4.25 9.95837 4.25 17C4.25 24.0416 9.95837 29.75 17 29.75Z"
        stroke="#400AB9"
        stroke-opacity="0.5"
        stroke-width="2.83333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 29.75C24.0416 29.75 29.75 24.0416 29.75 17C29.75 9.95837 24.0416 4.25 17 4.25C9.95837 4.25 4.25 9.95837 4.25 17C4.25 24.0416 9.95837 29.75 17 29.75Z"
        stroke="#400AB9"
        stroke-opacity="0.7"
        stroke-width="2.83333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="50%" cy="50%" r="6" fill="#400AB9" />
    </svg>
  );
}

function Tick({ completed }: { completed: boolean }) {
  if (!completed) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        fill="none"
        viewBox="0 0 34 34"
        className="h-[28px] 2-[28px] bg-white"
      >
        <path
          stroke="#A4A9B6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="1"
          strokeWidth="2.833"
          d="M17 29.75c7.042 0 12.75-5.708 12.75-12.75S24.042 4.25 17 4.25 4.25 9.958 4.25 17 9.958 29.75 17 29.75z"
        ></path>
        <path
          stroke="#A4A9B6C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
          strokeWidth="2.833"
          d="M17 29.75c7.042 0 12.75-5.708 12.75-12.75S24.042 4.25 17 4.25 4.25 9.958 4.25 17 9.958 29.75 17 29.75z"
        ></path>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      fill="none"
      viewBox="0 0 34 34"
      className="h-[28px] 2-[28px] bg-white"
    >
      <path
        stroke="#A4A9B6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
        strokeWidth="2.833"
        d="M17 29.75c7.042 0 12.75-5.708 12.75-12.75S24.042 4.25 17 4.25 4.25 9.958 4.25 17 9.958 29.75 17 29.75z"
      ></path>
      <path
        stroke="#2EB70C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.7"
        strokeWidth="2.833"
        d="M17 29.75c7.042 0 12.75-5.708 12.75-12.75S24.042 4.25 17 4.25 4.25 9.958 4.25 17 9.958 29.75 17 29.75z"
      ></path>
      <path
        stroke="#5DBE48"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M22 14l-7.338 7L11 17.5"
      ></path>
    </svg>
  );
}

export default Profile;
