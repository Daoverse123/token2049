import React, { ReactNode, useState } from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Markdown from "react-markdown";
import { xpList, levelList } from "@/xpList";

function Rewards() {
  return (
    <div className="flex flex-col w-full items-center ">
      <Nav />
      <div className="flex flex-col  w-full px-4 mb-14 mt-10">
        <h1 className="text-[28px] font-bold text-[#BF1C97]">Rewards</h1>
        <p className="mt-4">
          There is a level wise distribution of XPs and rewards. In order to
          attain XPs and win rewards one must complete quests.
        </p>
        <div className="flex flex-col gap-1 mt-3">
          <Faq question="What are quests?">
            Quests are tasks that a attendees need to complete to earn XPs and
            rewards.
            <h2 className="mt-4">There are two type of quests:</h2>
            <p className="font-semibold">1. Review speaker sessions visit</p>
            <p className="font-semibold">2. Sponsor booths</p>
          </Faq>
          <Faq question="How to enter quests?">
            <p className="font-semibold">1. Review speaker sessions visit</p>
            <p className="ml-4">
              After every speaker session there will be a QR code displayed on
              the hall screen, scan the QR code to review a speaker. After
              submitting you will successfully be rewarded XPs for the same.
            </p>
            <p className="font-semibold mt-4">2. Visit sponsor booths</p>
            <p className="ml-4">
              Simply visit the partner booths and scan the QR code at the
              booths. Scanning the QR code will verify that you visited it hence
              you will successfully be rewarded XPs for the same.
            </p>
          </Faq>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <Distribution level={1} />
          <Distribution level={2} />
          <Distribution level={3} />
          <Distribution level={4} />
          <Distribution level={5} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const Distribution = ({ level }: { level: number }) => {
  //@ts-ignore
  let { xp, session, booth } = levelList[level];

  return (
    <div className="flex flex-col border-b-2 pb-4">
      <h1 className="text-[20px] font-semibold text-[#BF1C97]">
        XPs and reward distribution
      </h1>
      <span className="mt-6">
        <h1 className="text-[18px] font-semibold">Level {level}</h1>
        <p className="mt-3 items-center flex text-[#5C657D]">
          Review speaker sessions:
          <span className="text-[24px] ml-2 font-semibold">{session}</span>
        </p>
        <p className="mt-3 items-center flex text-[#5C657D]">
          Visit sponsor booths:
          <span className="text-[24px] ml-2 font-semibold">{booth}</span>
        </p>
        <p className="mt-3 items-center flex text-[#5C657D]">
          Venue specials:
          <span className="text-[24px] ml-2 font-semibold">{1}</span>
        </p>
        <p className="mt-4 text-[#BF1C97] font-semibold">Rewards:</p>
        <h1 className="font-semibold text-[#5C657D] text-[24px]">
          {" "}
          {xp} XPs, Reward
        </h1>
      </span>
    </div>
  );
};

const Faq = ({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) => {
  const [open, setopen] = useState(false);

  return (
    <div className="flex flex-col">
      <span
        onClick={() => {
          setopen((st) => !st);
        }}
        className="cursor-pointer flex font-semibold mt-4 justify-between items-center"
      >
        {question} <Plus open={open} />
      </span>
      {open && <div className="text-[14px] mt-2">{children}</div>}
    </div>
  );
};

function Plus({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          stroke="#8247E5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.688"
          d="M2.813 9h12.374"
        ></path>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        stroke="#8247E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.688"
        d="M2.813 9h12.374M9 2.813v12.374"
      ></path>
    </svg>
  );
}

export default Rewards;
