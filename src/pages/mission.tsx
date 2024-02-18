import React, { ReactNode, useEffect, useState } from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Coin } from "@/components/Coin";
import axios from "axios";
import { useQuery } from "wagmi";
import { GreenTick } from "@/svgs";
import { toast } from "react-toastify";
import Auth from "@/components/auth";
import useUser from "@/hooks/useUser";

type MissionType = {
  _id: string;
  name: string;
  description: string;
  type: string;
  tags: any[];
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
  tasks: Task[];
};

type Task = {
  stepNum: number;
  taskTemplate: string;
  name: string;
  description: string;
  redirect_url: string;
  validationDetails: {
    url: string;
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type AttemptedMissionResponse = {
  mission: string;
  user: string;
  listing: string;
  tasks: any;
  isCompleted: boolean;
};

function Missions() {
  // let MISSION_ID = "65d18b857e5375ee54afb0d5";
  const [MISSION_ID, setMISSION_ID] = useState("");

  useEffect(() => {
    let spref = location.href.split("=");
    setMISSION_ID(spref[spref.length - 1]);
  }, []);

  let fetchmission = useQuery(
    ["fetchmission", MISSION_ID],
    async () => {
      let mission = await axios.get(`${process.env.API}/mission/${MISSION_ID}`);

      mission.data.data.mission as MissionType;

      let status = await axios.get(
        `${process.env.API}/mission/${MISSION_ID}/my-status`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      status.data.data.attemptedMission;

      return {
        mission: mission.data.data.mission,
        status: status.data.data.attemptedMission,
      } as { mission: MissionType; status: AttemptedMissionResponse };
    },
    {
      enabled: Boolean(MISSION_ID.length > 0),
    }
  );

  let verify = async (id: string) => {
    try {
      let res = await axios.get(
        `${process.env.API}/mission/${MISSION_ID}/task-verify/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.status == 200 || res.status == 201) {
        fetchmission.refetch();
      } else {
        toast.error("Mission failed please try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (er) {
      console.log(er);
      toast.error("Mission failed please try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  let claim = async () => {
    try {
      let res = await axios.get(
        `${process.env.API}/mission/${MISSION_ID}/claim`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.status == 200 || res.status == 201) {
        location.href = "/success";
      } else {
        toast.error("Mission failed please try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (er) {
      console.log(er);
      toast.error("Mission failed please try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const isCompleted = () => {
    if (!fetchmission.isSuccess) {
      return true;
    }

    let status = Object.values(fetchmission.data?.status.tasks);
    let cmp = status.filter((ele) => ele == "COMPLETE");
    return !(status.length == cmp.length);
  };

  const [showAuth, setshowAuth] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setshowAuth(true);
    }
  }, []);

  return (
    <>
      {showAuth && <Auth />}
      <div className="flex flex-col w-full items-center ">
        <Nav />
        <div className="flex flex-col  w-full px-4 mb-14 mt-10">
          <span className="flex gap-4  border-[1.5px] border-[#BF1C97] p-4 rounded-xl">
            <picture>
              <img
                className="min-w-[103.5px] w-[103.5px] object-cover h-[138px] rounded-lg"
                src="https://truts-event.s3.ap-south-1.amazonaws.com/event-random-3.webp"
                alt=""
              />
            </picture>
            <span className="flex flex-col w-auto ">
              <p>Sweatcoin</p>
              <h1 className="text-[20px] font-semibold">
                Join Sweatcoin Community
              </h1>
              <p className="font-bold flex items-center text-[20px] gap-2">
                <Coin /> 400XPs
              </p>
            </span>
          </span>
          {fetchmission.isSuccess &&
            fetchmission.data?.mission?.tasks.map((ele, idx) => {
              let status = fetchmission.data?.status.tasks[ele._id];
              return (
                <span
                  style={
                    status == "COMPLETE"
                      ? {
                          background: "#2BC37F1A",
                          borderColor: "#2BC37F29",
                        }
                      : {}
                  }
                  key={"key" + idx}
                  className="flex flex-col  border-[1.5px] border-[#BF1C97] p-4 rounded-xl mt-8"
                >
                  <span className="w-[32px] h-[32px] flex justify-center items-center bg-[#EEEFF2] rounded-full">
                    1
                  </span>
                  <h1 className="font-semibold mt-2">{ele.name}</h1>
                  <p className="mt-1">{ele.description}</p>
                  {fetchmission.isRefetching ? (
                    <div role="status" className="mt-6">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin  fill-[#BF1C97]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <>
                      {status == "INCOMPLETE" && (
                        <button
                          onClick={() => {
                            verify(ele._id);
                          }}
                          className="bg-[#BF1C97] h-[33px] text-[12px] mt-6 text-white w-min px-6 py-1 rounded-xl"
                        >
                          Verify
                        </button>
                      )}
                      {status == "COMPLETE" && (
                        <button className="bg-[#B2D4A7] gap-2 flex items-center h-[33px] text-[12px] mt-6 text-[#44AC21] w-min px-6 py-1 rounded-xl">
                          Verified <GreenTick />
                        </button>
                      )}
                    </>
                  )}
                </span>
              );
            })}

          {fetchmission.isSuccess && !fetchmission.data?.status.isCompleted && (
            <button
              onClick={() => {
                claim();
              }}
              disabled={isCompleted()}
              className="bg-[#BF1C97] disabled:bg-gray-400 h-[52px] text-[16px] mt-12 text-white px-6 py-1 rounded-xl"
            >
              Verify
            </button>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Missions;
