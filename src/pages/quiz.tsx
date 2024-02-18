import React, { ReactNode, useState } from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Coin } from "@/components/Coin";

function Missions() {
  return (
    <div className="flex flex-col w-full items-center ">
      <Nav />
      <div className="flex flex-col  w-full px-4 mb-14 mt-10">
        <span className="flex flex-col gap-4  border-[1.5px] border-[#BF1C97] p-4 rounded-xl">
          <h1 className="flex gap-1 text-[18px] font-bold">
            <span>1.</span> What does Sweatcoin reward users for?
          </h1>
          <div className="flex gap-4 flex-col mt-6">
            <Option state="right" title="Watching Videos" />
            <Option state="wrong" title="Playing Games" />
            <Option state="right" title="Daily Steps" />
            <Option state="right" title="Reading Articles" />
          </div>
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-[#400AB9] font-semibold">Correct</p>
              <p className="text-[#400AB9] font-semibold">
                Answers: <span className="text-[#44AC21]">1</span>/2
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#8C93A3]">Reward</p>
              <span className="flex text-[14px] mt-1 items-center gap-1">
                <Coin className="w-[22px] h-[22px]" />
                100 XP
              </span>
            </div>
          </div>
          <button
            disabled
            className="bg-[#BF1C97] disabled:bg-gray-400 h-[52px] text-[16px] mt-4 text-white px-6 py-1 rounded-xl"
          >
            Verify
          </button>
        </span>
      </div>
      <Footer />
    </div>
  );
}

const Option = ({
  state,
  title,
}: {
  title: string;
  state: "right" | "wrong" | "default";
}) => {
  let colors = {
    right: {
      bg: "#2BC37F66",
      outline: "#2BC37F",
    },
    wrong: {
      bg: "#E73E4266",
      outline: "#E73E42",
    },
    default: {
      bg: "#EEEFF2",
      outline: "#A4A9B6",
    },
  };

  return (
    <span
      style={{
        outlineColor: colors[state].outline,
        background: colors[state].bg,
      }}
      className="cursor-pointer  w-full items-center px-4 flex h-[42px] outline-[#A4A9B6] outline rounded-lg bg-[#EEEFF2]"
    >
      {title}
    </span>
  );
};

export default Missions;
