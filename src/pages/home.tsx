import React from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Rings from "@/components/Rings";

function Home() {
  return (
    <div className="flex flex-col w-full items-center ">
      <Nav />
      <div className="flex flex-col   w-full  mt-10">
        <div className="flex flex-col items-center px-4 relative overflow-hidden">
          {/* <span className="absolute flex w-full justify-center top-20 pr-6 scale-125">
            <Rings />
          </span> */}
          <h1
            style={{
              fontFamily: "Neue",
            }}
            className="text-[28px] font-bold uppercase text-center "
          >
            We Bring Together the Leading voices in Crypto
          </h1>
          <p className="font-light w-[88%] text-[17.4px] mt-2">
            TOKEN2049 is premier crypto event, organized annually Dubai &
            Singapore, where founders and executives of the leading web3
            companies and projects share their view on the industry.
          </p>
          <h2
            style={{
              fontFamily: "Neue",
            }}
            className="text-[32px] text-[#400AB9] text-center mt-12"
          >
            TOKEN2049 Quests
          </h2>
          <span className="flex  flex-col max-[768px]:gap-2  justify-center  mt-1  max-[768px]:ml-0 max-[768px]:flex-row max-[768px]:items-center">
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
        </div>
        <div className="bg-[#F6F6F6] px-6 pt-6 mt-6 flex flex-col items-center justify-center">
          {/* <picture className="mx-auto mt-8">
            <img
              src="https://sweatco.in/static/media/header__logo.1fc7a1ce.svg"
              alt=""
              style={{
                filter: "invert(0.3)",
              }}
              className="w-[178px] h-[39.5px]"
            />
          </picture> */}
          {/* <h1
            style={{
              fontFamily: "Neue",
            }}
            className="font-bold text-[28px] text-center mt-4"
          >
            Powered by Sweatcoin
          </h1> */}
          <p className="text-[16px] mt-2 w-[96%]  font-light pb-4">
            Sweatcoin is a free app which rewards your daily steps with a
            new-generation currency you can spend on cool products or donate to
            charity. Why? Because when you look after your health, you benefit
            society. You are more productive. You help save $billions in
            healthcare. Your movement has value: you deserve a share in it.
          </p>
          <div className="flex w-full flex-wrap gap-4 my-6 justify-center">
            <div
              onClick={() => {
                location.href = "/mission?mission=65d18b857e5375ee54afb0d5";
              }}
              className="flex w-[144px] flex-col"
            >
              <picture className="w-[144px] h-[192]">
                <img
                  src={
                    "https://truts-event.s3.ap-south-1.amazonaws.com/event-random-1.webp"
                  }
                  className="w-[144px] h-[192px] object-cover rounded-sm"
                  alt=""
                />
              </picture>
              <h1 className="text-[12px] font-light">Sweatcoin</h1>
              <p className="text-[16px] font-semibold">
                Join Sweatcoin Community
              </p>
              <p className="text-[16px] font-semibold">500 XPs</p>
            </div>
            <div
              onClick={() => {
                location.href = "/quiz";
              }}
              className="flex w-[144px] flex-col"
            >
              <picture className="w-[144px] h-[192]">
                <img
                  src={
                    "https://truts-event.s3.ap-south-1.amazonaws.com/event-random-2.webp"
                  }
                  className="w-[144px] h-[192px] object-cover rounded-sm"
                  alt=""
                />
              </picture>
              <h1 className="text-[12px] font-light">Sweatcoin</h1>
              <p className="text-[16px] font-semibold">
                What is Sweatcoin Quiz
              </p>
              <p className="text-[16px] font-semibold">500 XPs</p>
            </div>
            <div
              onClick={() => {
                location.href = "/mission?mission=65d18b857e5375ee54afb0d5";
              }}
              className="flex w-[144px] flex-col"
            >
              <picture className="w-[144px] h-[192]">
                <img
                  src={
                    "https://truts-event.s3.ap-south-1.amazonaws.com/event-random-6.webp"
                  }
                  className="w-[144px] h-[192px] object-cover rounded-sm"
                  alt=""
                />
              </picture>
              <h1 className="text-[12px] font-light">Sweatcoin</h1>
              <p className="text-[16px] font-semibold">
                Follow Sweatcoin on Socials
              </p>
              <p className="text-[16px] font-semibold">500 XPs</p>
            </div>
            <div
              onClick={() => {
                location.href = "/mission?mission=65d18b857e5375ee54afb0d5";
              }}
              className="flex w-[144px] flex-col"
            >
              <picture className="w-[144px] h-[192]">
                <img
                  src={
                    "https://truts-event.s3.ap-south-1.amazonaws.com/event-random-5.webp"
                  }
                  className="w-[144px] h-[192px] object-cover rounded-sm"
                  alt=""
                />
              </picture>
              <h1 className="text-[12px] font-light">Sweatcoin</h1>
              <p className="text-[16px] font-semibold">
                What makes Sweatcoin unique
              </p>
              <p className="text-[16px] font-semibold">500 XPs</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
