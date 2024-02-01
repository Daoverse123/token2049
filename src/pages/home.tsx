import React, { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

//components
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Auth from "@/components/auth";

import { create } from "zustand";
import useUser from "@/hooks/useUser";

type Store = {
  response: {};
  register: (label: string, rating: string) => void;
};

const useStore = create<Store>()((set) => ({
  response: {},
  register: (label: string, rating: string) =>
    set((state) => {
      state.response = { ...state.response, [label]: rating };
      return { ...state };
    }),
}));

function Home() {
  let { response } = useStore();
  const [showAuth, setshowAuth] = useState(false);

  let { isLogedIn, isLoading } = useUser();

  useEffect(() => {
    setshowAuth(false);
  }, [isLogedIn]);

  const postFormData = async (data: any): Promise<any> => {
    // Create a FormData object
    const formData = new FormData();

    // Append each data field to the FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as any]);
    });

    try {
      // Retrieve the authorization token from localStorage
      const authToken = localStorage.getItem("token"); // Replace with your actual key

      // Set up the headers
      const headers: Record<string, string> = {
        "Content-Type": "multipart/form-data",
      };

      // If the token exists, add it to the headers
      if (authToken) {
        headers["Authorization"] = `${authToken}`;
      }

      // Post the FormData using Axios
      const response = await axios.post(
        `${process.env.API}/temp/form`,
        formData,
        {
          headers,
        }
      );

      if (response.status == 201) {
        location.href = "/success";
      }

      console.log("Response:", response.data);
      return response;
    } catch (error: any) {
      console.error("Error posting form data:", error);
      if (error?.response?.status == 403) {
        location.href = "/duplicate";
      }
    }
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center">
      {showAuth && <Auth />}
      <Nav
        showAuth={() => {
          setshowAuth(true);
        }}
      />
      <div className="shadow-lg mt-[60px] max-[768px]:mt-[20px] mb-[133px] max-[768px]:mb-[54px] h-fit w-[95%] max-w-[1300px] rounded-[36px] gradTB grid place-items-center">
        <span className="flex flex-col w-[99.7%] max-[768px]:w-[98.4%] max-[768px]:h-[99%] h-[99.6%] bg-white rounded-[36px] px-[48px]  p-[60px] max-[768px]:p-8 max-[425px]:p-6">
          <div className="flex justify-between w-full max-[768px]:flex-col">
            <span className="flex flex-col">
              <h1 className="text-[40px] font-[600] uppercase text-[#0F1D40] max-[1330px]:text-3xl max-[768px]:text-xl">
                Review speaker sessions
              </h1>
              <p className="text-[20px] font-[500] text-[#49536E] max-[1330px]:text-lg max-[768px]:text-base">
                Get rewarded with XPs for reviewing the speaker session.
              </p>
            </span>
            <span className="flex flex-col ml-auto max-[1330px]:ml-0 max-[768px]:flex-row max-[768px]:items-center">
              <p className="ml-auto text-[22.1px] max-[1330px]:text-1xl max-[768px]:ml-0 max-[768px]:text-base max-[375px]:text-sm">
                Rewards
              </p>
              <span className="flex items-center gap-2 max-[768px]:ml-4 max-[375px]:ml-2">
                <Coin />
                <h1 className="text-[38.7px] font-[600] gradText max-[1330px]:text-3xl  max-[768px]:text-base max-[375px]:text-sm">
                  10000 XP
                </h1>
              </span>
              <span className="flex flex-col items-end mt-3  max-[768px]:ml-auto">
                <p className="text-base gradText max-[768px]:text-sm max-[375px]:text-xs">
                  Powered by
                </p>
                <h1 className="text-2xl  max-[768px]:text-xl max-[375px]:text-base">
                  SPONSOR
                </h1>
              </span>
            </span>
          </div>

          <div
            className={`flex flex-col gap-12 mt-[90px] max-[768px]:mt-[50px] `}
          >
            {!isLogedIn && (
              <div className="max-[768px]:flex-col  max-[768px]:mx-auto max-[768px]:gap-4  flex items-center justify-between border-2 rounded-3xl py-2 px-3 border-red-500 w-[95%] max-w-[750px] ">
                <h1 className="text-xl max-[768px]:text-base text-gray-600 text-center">
                  Please Login/Sign-up to Access the Form
                </h1>
                <button
                  onClick={() => {
                    setshowAuth(true);
                  }}
                  className="px-4 py-2 gradLR text-white rounded-3xl"
                >
                  Login/Sign-up
                </button>
              </div>
            )}
            <div
              className={`${
                !isLogedIn && "pointer-events-none"
              } flex w-full flex-col gap-8`}
            >
              <Slider label="How would you rate the speaker's knowledge and expertise on the topic discussed?" />
              <Slider label="How effectively did the speaker engage the audience throughout the session?" />
              <Slider label="To what extent did the speaker's presentation meet your expectations?" />
            </div>
          </div>
          {isLogedIn ? (
            <button
              onClick={async () => {
                let token = localStorage.getItem("token");
                if (token) {
                  postFormData(response);
                } else {
                  toast.warn("Please Login !", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  setshowAuth(true);
                }
              }}
              className="gradLR text-white py-4 rounded-[53px] mt-[89px] max-[768px]:mt-16"
            >
              Verify & Claim
            </button>
          ) : (
            <></>
          )}
        </span>
      </div>
      <Footer />
    </div>
  );
}

const Slider = ({ label }: { label: string }) => {
  let { register } = useStore();
  return (
    <div className="flex flex-col w-full">
      <span className="flex items-center text-[28px] gap-7 max-[1330px]:gap-4">
        <h1 className="gradText text-[49.636px] max-[1330px]:text-4xl">Q</h1>
        <h1 className="text-[28px] font-[500] max-[1330px]:text-2xl max-[768px]:text-base">
          {label}
        </h1>
      </span>
      <div className="flex ml-[65px] max-[1330px]:ml-[45px] pt-3">
        <SliderComp
          setter={(rating: string) => {
            register(label, rating);
          }}
        />
      </div>
    </div>
  );
};

function Coin() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="51"
      fill="none"
      viewBox="0 0 51 51"
      className="max-[1330px]:w-8 max-[768px]:w-5 "
    >
      <path
        fill="#83A3F8"
        d="M50.132 25.074c0 13.804-11.21 25.015-25.015 25.015S.102 38.879.102 25.074 11.312.059 25.117.059c13.804 0 25.015 11.16 25.015 25.015z"
      ></path>
      <path
        fill="#ACC1FA"
        d="M44.257 8.968a24.859 24.859 0 00-19.14-8.91C11.312.059.102 11.269.102 25.075c0 2.888.49 5.678 1.42 8.273C15.62 24.976 29.864 16.8 44.256 8.968z"
      ></path>
      <path
        fill="#3065F3"
        d="M43.718 24.68c0 10.524-8.518 19.042-19.042 19.042-10.525 0-19.043-8.518-19.043-19.043 0-10.524 8.518-19.042 19.043-19.042 10.524 0 19.042 8.518 19.042 19.043z"
      ></path>
      <path
        fill="#5984F5"
        d="M44.264 25.464c0 10.378-8.42 18.75-18.75 18.75-10.377 0-18.748-8.42-18.748-18.75 0-10.378 8.42-18.749 18.749-18.749 10.378-.049 18.749 8.371 18.749 18.75z"
      ></path>
      <g filter="url(#filter0_i_12211_45828)">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M17.352 17.374a.326.326 0 00-.326.327v1.985c0 .18.146.327.326.327h5.215a.979.979 0 010 1.96h-5.215a2.284 2.284 0 01-2.282-2.287v-1.985a2.284 2.284 0 012.282-2.287h15.123a2.284 2.284 0 012.282 2.287v1.985a2.284 2.284 0 01-2.282 2.287h-4.289v13.21a2.284 2.284 0 01-2.282 2.286h-1.877a2.284 2.284 0 01-2.281-2.287V24.506a.979.979 0 111.955 0v10.676c0 .18.146.327.326.327h1.877c.18 0 .326-.146.326-.327v-14.11c0-.218.071-.42.191-.582a.977.977 0 01.84-.477h5.214c.18 0 .326-.146.326-.327v-1.985a.326.326 0 00-.326-.327H17.352z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_i_12211_45828"
          width="20.058"
          height="22.055"
          x="15.07"
          y="15.414"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dx="0.37"></feOffset>
          <feGaussianBlur stdDeviation="0.37"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 0.188235 0 0 0 0 0.396078 0 0 0 0 0.952941 0 0 0 0.5 0"></feColorMatrix>
          <feBlend
            in2="shape"
            result="effect1_innerShadow_12211_45828"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

function SliderComp({ setter }: { setter: (rating: string) => any }) {
  const [sliderValue, setsliderValue] = useState(50);

  useEffect(() => {
    setter(`${sliderValue}`);
  }, [sliderValue]);

  return (
    <div className={"slider w-full"}>
      <span className={"sliderComp"}>
        <div className={"sliderBarBg"}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
            return <span key={"marker" + i} className={"marker"}></span>;
          })}
        </div>
        <div
          style={{ width: `${Math.min(sliderValue, 97)}%` }}
          className={"sliderBar"}
        />
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={sliderValue}
          onChange={(e) => {
            setsliderValue(parseInt(e.target.value));
          }}
        />
      </span>
      <p className={"value"}>{sliderValue / 10}</p>
    </div>
  );
}

export default Home;
