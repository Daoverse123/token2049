import React, { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

//components
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Auth from "@/components/auth";
import Rings from "@/components/Rings";
import { create } from "zustand";
import useUser from "@/hooks/useUser";
import { Coin } from "@/components/Coin";
import { useQuery } from "wagmi";
import { env } from "process";

type Store = {
  response: {};
  register: (id: string, rating: string) => void;
};

const useStore = create<Store>()((set) => ({
  response: {},
  register: (id: string, rating: string) =>
    set((state) => {
      state.response = { ...state.response, [id]: rating };
      return { ...state };
    }),
}));

type MissionType = {
  _id: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  listing: {
    photo: {
      logo: {
        id: string;
        secure_url: string;
      };
      cover: {
        id: string;
        secure_url: string;
      };
    };
    _id: string;
    name: string;
    slug: string;
    id: string;
  };
  listingXP: number;
  visible: boolean;
  trending: boolean;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: ReviewType[];
};

type ReviewType = {
  prompt: string;
  _id: string;
};
// let MISSION_ID = "65d10c0768f92064f6c21ba2";
function Review() {
  const [MISSION_ID, setMISSION_ID] = useState("");
  let { response } = useStore();
  const [showAuth, setshowAuth] = useState(false);

  let { isLogedIn, isLoading } = useUser();

  console.log(response);

  useEffect(() => {
    let spref = location.href.split("=");
    setMISSION_ID(spref[spref.length - 1]);
  }, []);

  useEffect(() => {
    setshowAuth(false);
  }, [isLogedIn]);

  let questions = useQuery(
    ["question", MISSION_ID],
    async () => {
      let res = await axios.get(`${process.env.API}/mission/${MISSION_ID}`);
      if (res.status == 200) {
        return res.data.data.mission as MissionType;
      }
    },
    {
      enabled: Boolean(MISSION_ID.length > 0),
    }
  );

  const postReview = async () => {
    let res = await axios.post(
      `${process.env.API}/mission/${MISSION_ID}/rate-review-form`,
      { ...response },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status == 200 || res.status == 201) {
      let claim = await axios.get(
        `${process.env.API}/mission/${MISSION_ID}/claim`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (claim.status == 200) {
        if (claim.data.error == "already claimed mission completion") {
          location.href = "/duplicate";
        } else {
          location.href = "/success";
        }
      }
    }
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center">
      {showAuth && (
        <Auth
          close={() => {
            setshowAuth(false);
          }}
        />
      )}
      <Nav />
      <div className="relative mt-[60px] max-[768px]:mt-[20px] mb-[133px] max-[768px]:mb-[54px] h-fit w-[100%] max-w-[1300px] rounded-[36px]  grid place-items-center">
        <span className="absolute top-[6%] left-[-22%] hidden max-[768px]:block">
          <Rings />
        </span>
        <span className="flex flex-col w-[99.7%] max-[768px]:w-[98.4%] max-[768px]:h-[99%] h-[99.6%] bg-white rounded-[36px] px-[48px]  p-[60px] max-[768px]:p-8 max-[425px]:p-6">
          <div className="flex justify-between w-full max-[768px]:flex-col-reverse ">
            <span className="flex flex-col">
              <h1 className="text-[40px] w-[90%] font-[700] uppercase text-[#BF1C97] max-[1330px]:text-3xl max-[768px]:text-[24px]">
                Review speaker sessions
              </h1>
              <p className="text-[24px] font-[500] text-[#49536E] max-[1330px]:text-lg max-[768px]:text-base max-[768px]:mt-2">
                Get rewarded with XPs for reviewing the session{" "}
                {questions.isSuccess && (
                  <span className="font-bold text-black">
                    {questions.data?.name}
                  </span>
                )}
              </p>
            </span>
            <span className="flex flex-col ml-auto max-[1330px]:ml-0 max-[768px]:flex-row max-[768px]:items-center ">
              <span className="flex flex-col max-[768px]:gap-3 items-end mt-3  max-[768px]:ml-0 max-[768px]:flex-row max-[768px]:items-center">
                <p className="text-[20px] font-semibold max-[768px]:text-[16px] text-[#400AB9] max-[768px]:text-sm max-[375px]:text-xs">
                  Powered by
                </p>
                <picture>
                  <img
                    src="https://sweatco.in/static/media/header__logo.1fc7a1ce.svg"
                    alt=""
                    style={{
                      filter: "invert(0.3)",
                    }}
                    className="w-[254px] h-[56.3px] max-[768px]:w-[178px] mt-1"
                  />
                </picture>
              </span>
            </span>
          </div>
          <div className="mt-6">
            <p className="ml-auto text-[#2C3857] text-[22.1px] max-[1330px]:text-1xl max-[768px]:ml-0  max-[768px]:text-[14.2px]">
              Rewards
            </p>
            <span className="flex mt-1 items-center gap-2 max-[768px]:ml-0 max-[375px]:ml-0">
              <Coin />
              <h1 className="text-[38.7px] max-[768px]:text-[25px] font-[600] text-[#400AB9] max-[1330px]:text-3xl  ">
                500 XP
              </h1>
            </span>
          </div>

          <div
            className={`flex flex-col gap-12 mt-[90px] max-[768px]:mt-[20px] `}
          >
            {!isLogedIn && (
              <div className="max-[768px]:flex-col  max-[768px]:mx-auto max-[768px]:gap-4  flex items-center justify-between border-2 rounded-3xl py-2 px-3 outline-[#BF1C97] outline outline-2 w-[95%] max-w-[750px] ">
                <h1 className="text-xl max-[768px]:text-base text-gray-600 text-center">
                  Please Login/Sign-up to Access the Form
                </h1>
                <button
                  onClick={() => {
                    setshowAuth(true);
                  }}
                  className="px-4 py-2 bg-[#BF1C97] text-white rounded-3xl"
                >
                  Login/Sign-up
                </button>
              </div>
            )}
            {questions.isSuccess && (
              <div
                className={`${
                  !isLogedIn && "pointer-events-none"
                } flex w-full flex-col gap-8`}
              >
                {questions.data?.reviews.map((ele, idx) => {
                  return (
                    <Slider id={ele._id} label={ele.prompt} key={"qn" + idx} />
                  );
                })}
              </div>
            )}
          </div>
          {isLogedIn ? (
            <button
              onClick={async () => {
                let token = localStorage.getItem("token");
                if (token) {
                  postReview();
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
              className="bg-[#BF1C97] text-white py-4 rounded-[12px] mt-[89px] max-[768px]:mt-16 max-[768px]:text-[16px]"
            >
              Claim
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

const Slider = ({ label, id }: { label: string; id: string }) => {
  let { register } = useStore();
  return (
    <div className="flex flex-col w-full">
      <span className="flex items-center text-[28px] gap-7 max-[1330px]:gap-4">
        <h1 className="text-[28px] font-[500] max-[1330px]:text-2xl max-[768px]:text-base">
          <span
            style={{
              fontFamily: "Qfont",
            }}
            className="text-[#000000] text-[49.636px] max-[768px]:text-[28px] max-[1330px]:text-4xl"
          >
            Q.{" "}
          </span>
          {label}
        </h1>
      </span>
      <div className="flex   pt-3">
        <SliderComp
          setter={(rating: string) => {
            register(id, `${parseInt(rating) / 10}`);
          }}
        />
      </div>
    </div>
  );
};

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

export default Review;
