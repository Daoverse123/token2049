import React from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { limitCharacters } from "@/utils";

import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import useUser from "@/hooks/useUser";

type LeaderboardType = {
  _id: string;
  totalListingXP: number;
  latestCompletedAt: string;
  user: {
    _id: string;
    photo?: {
      id?: string;
      secure_url: string;
    };
    name: string;
    username?: string;
  };
};

function Leaderboard({ leaderboard }: { leaderboard: LeaderboardType[] }) {
  let { isLoading, isLogedIn, user } = useUser();

  return (
    <div className="flex flex-col w-full items-center ">
      <Nav />
      <div className="flex flex-col items-center w-full px-4 mb-14">
        <h1
          style={{
            fontFamily: "Neue",
          }}
          className="text-[28px] font-bold text-[#BF1C97] mt-10"
        >
          Leaderboard
        </h1>
        <span className="flex  w-full  justify-center items-center gap-3 mt-2">
          <p className="font-semibold text-[16px] text-[#400AB9]">Powered by</p>
          <picture>
            <img
              src="https://sweatco.in/static/media/header__logo.1fc7a1ce.svg"
              alt=""
              style={{
                filter: "invert(0.3)",
              }}
              className="w-[178px] h-[39.5px]"
            />
          </picture>
        </span>
        <div className="flex rounded-[20px] py-4 flex-col gap-3 items-center w-full mt-4 h-fit bg-[#F6F6F6]">
          {leaderboard.map((ele, idx) => {
            let username = !isLoading && isLogedIn ? user?.name : null;

            return (
              <Position
                currentUser={username === ele.user.name}
                userData={ele}
                key={"star" + ele}
                pos={idx + 1}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

let entryColor = {
  first: {
    grad: "linear-gradient(90deg, rgba(225, 171, 75, 0.2) 1.94%, rgba(255, 255, 255, 0.2) 33.28%)",
    color: "#E1AB4B",
  },
  second: {
    grad: "linear-gradient(90deg, rgba(181, 181, 181, 0.2) 1.94%, rgba(255, 255, 255, 0.2) 33.28%)",
    color: "#B5B5B5",
  },
  third: {
    grad: "linear-gradient(90deg, rgba(181, 100, 77, 0.2) 1.94%, rgba(255, 255, 255, 0.2) 33.28%)",
    color: "#B5644D",
  },
};

let labels: ["first", "second", "third"] = ["first", "second", "third"];

const Position = ({
  pos,
  userData,
  currentUser,
}: {
  pos: number;
  userData: LeaderboardType;
  currentUser: boolean;
}) => {
  let { grad, color } =
    pos <= 3 ? entryColor[labels[pos - 1]] : { grad: "", color: "" };

  return (
    <div
      style={
        !currentUser
          ? {
              background: grad,
            }
          : { outline: `1px solid #400AB9` }
      }
      className="relative flex min-h-[51.4px] w-[90%] bg-white rounded-[7.8px] shadow-md items-center px-3"
    >
      <span
        style={{
          background: color,
        }}
        className="flex w-[2.25px] h-[65%] rounded-lg absolute left-0 "
      ></span>
      <Star pos={pos} />
      <h1
        style={!currentUser ? {} : { color: `#400AB9` }}
        className=" text-[12px] font-semibold"
      >
        {limitCharacters(userData.user.name, 25)}
      </h1>
      <p className="text-[10px] font-semibold ml-auto mr-1">3000 XPs</p>
      <Coin />
    </div>
  );
};

function Star({ pos }: { pos: number }) {
  if (pos > 3) {
    return (
      <span className="flex mr-2  w-[26px] h-[26px] bg-[#49536E] justify-center items-center text-white rounded-full">
        {pos}
      </span>
    );
  }

  let { grad, color } = entryColor[labels[pos - 1]];

  return (
    <span className="flex  mr-2 justify-center items-center relative w-[25.4px] h-[25.4px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="30"
        fill="none"
        viewBox="0 0 29 30"
        className=" absolute z-0"
      >
        <path
          fill={color}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.151"
          d="M5.724 24.212c-1.124-1.125-.379-3.484-.953-4.865-.575-1.381-2.775-2.591-2.775-4.12 0-1.527 2.176-2.688 2.775-4.118.599-1.43-.171-3.74.953-4.865 1.125-1.125 3.484-.38 4.865-.954 1.381-.574 2.591-2.774 4.12-2.774 1.527 0 2.688 2.175 4.119 2.774 1.43.6 3.74-.17 4.864.954 1.125 1.124.38 3.483.954 4.865.574 1.38 2.774 2.59 2.774 4.119 0 1.528-2.175 2.689-2.774 4.12-.6 1.43.171 3.74-.954 4.864-1.124 1.125-3.483.379-4.864.953-1.382.575-2.592 2.775-4.12 2.775s-2.689-2.176-4.119-2.775c-1.43-.598-3.74.172-4.865-.953z"
        ></path>
      </svg>
      <p className=" text-white z-10">{pos}</p>
    </span>
  );
}

function Coin() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="52"
      fill="none"
      viewBox="0 0 51 52"
      className="h-[12.5px] w-[12.5px]"
    >
      <path
        fill="#BE1E97"
        d="M50.322 26.066c0 13.88-11.27 25.15-25.15 25.15-13.879 0-25.15-11.27-25.15-25.15 0-13.88 11.271-25.15 25.15-25.15 13.88 0 25.15 11.221 25.15 25.15z"
      ></path>
      <path
        fill="#FF50D4"
        d="M44.416 9.874A24.993 24.993 0 0025.173.916c-13.88 0-25.15 11.27-25.15 25.15 0 2.904.492 5.71 1.427 8.318 14.174-8.416 28.496-16.636 42.966-24.51z"
      ></path>
      <path
        fill="#D99E82"
        d="M43.875 25.67c0 10.583-8.564 19.146-19.145 19.146-10.582 0-19.146-8.563-19.146-19.145 0-10.582 8.564-19.146 19.146-19.146 10.581 0 19.145 8.564 19.145 19.146z"
      ></path>
      <path
        fill="#FFD8C6"
        d="M44.423 26.46c0 10.434-8.465 18.85-18.85 18.85-10.434 0-18.85-8.465-18.85-18.85 0-10.434 8.465-18.85 18.85-18.85 10.434-.05 18.85 8.416 18.85 18.85z"
      ></path>
      <g clipPath="url(#clip0_13021_1144)">
        <path
          fill="#C1694F"
          stroke="#000"
          strokeWidth="0.238"
          d="M16.733 14.282h0l.005.004.015.012.06.05a5.682 5.682 0 01.882 1.008h0v.001c.11.155.174.268.206.344a1.501 1.501 0 01-.262-.164c-.192-.16-.486-.364-.783-.57l-.19-.132a14.45 14.45 0 01-.502-.362 2.564 2.564 0 01-.332-.289h0a1.537 1.537 0 01-.318-.686.715.715 0 01-.013-.141c.001-.03.005-.05.009-.061a.179.179 0 01.023.009c.199.127.41.3.616.48l.163.141c.149.13.293.256.42.356z"
        ></path>
        <path
          fill="#D99E82"
          stroke="#000"
          strokeWidth="0.238"
          d="M18.477 14.834l-.116.026.019.086.088.007H18.477l.03.004a4.445 4.445 0 01.521.097c.333.083.766.231 1.17.488h0c1.64 1.014 2.11 2.749 2.294 4.411a25.527 25.527 0 01.11 1.392c.02.324.039.634.066.92.032.338.075.647.146.912.07.263.17.491.32.658h0l.004.005c.031.03.07.047.1.056.034.01.071.017.11.021.079.009.178.01.294.007a15.1 15.1 0 00.923-.07l.518-.051a64.577 64.577 0 012.328-.204c1.096-.07 2.284-.101 3.41-.013 1.127.088 2.183.296 3.018.695 1.414.688 1.973 1.538 2.276 2.268.103.246.174.473.24.683.035.11.068.216.103.317.099.282.217.537.447.675.017.01.028.019.034.025a.157.157 0 01-.027.017c-.084.045-.268.072-.497.007-.443-.127-1.045-.602-1.268-1.918l-.236.015c-.38 8.348-.797 10.39-1.25 12.239-.125.501-.46.741-.7.73-.113-.004-.224-.064-.302-.208-.081-.149-.129-.39-.092-.747h0c.038-.384.124-1.746.1-3.156a17.29 17.29 0 00-.138-2.04c-.086-.61-.222-1.141-.438-1.452-.098-.142-.246-.204-.417-.213a1.879 1.879 0 00-.588.091c-.262.074-.58.19-.946.322-.251.092-.525.191-.82.291-1.458.496-3.49 1.032-6.086.787l-.116-.01-.014.115a66.995 66.995 0 01-.573 3.898c-.087.486-.167.879-.23 1.167a4.422 4.422 0 01-.136.52c-.197.427-.513.612-.731.612a.277.277 0 01-.242-.119c-.055-.08-.089-.217-.054-.426.154-.925.345-3.755-.65-6.814l-.011-.037-.033-.023c-2.052-1.46-2.36-4.058-2.29-6.524.019-.615.06-1.217.102-1.79l.022-.292c.035-.463.068-.904.086-1.307.023-.487.024-.926-.02-1.293-.043-.362-.132-.67-.305-.882a.698.698 0 00-.195-.158 2.265 2.265 0 00-.281-.136 6.89 6.89 0 00-.734-.245 13.131 13.131 0 00-1.333-.302h0l-.009-.001a7.905 7.905 0 01-1.233-.187l-.007-.001-.007-.001s-.005-.001-.014-.006a.214.214 0 01-.038-.03.77.77 0 01-.108-.14 2.724 2.724 0 01-.228-.47 3.75 3.75 0 01-.162-.532c-.037-.17-.045-.291-.032-.349a.48.48 0 01.214-.317c.133-.095.338-.185.664-.32.158-.064.28-.106.377-.139l.025-.008c.082-.027.155-.051.21-.08a.3.3 0 00.154-.167.735.735 0 00.03-.247h0l-.001-.012c-.015-.15.053-.3.203-.445a1.99 1.99 0 01.634-.382c.526-.212 1.18-.312 1.65-.258l.34.04-.242-.242s0 0 0 0l-.005-.006a.52.52 0 01-.048-.067 5.008 5.008 0 01-.106-.168 25.635 25.635 0 01-.844-1.513l-.003-.006-.004-.007a.337.337 0 01-.06-.137.121.121 0 01.048-.015.549.549 0 01.148.004c.247.035.59.185.778.371a.636.636 0 01.07.123c.028.062.059.14.09.227.063.176.126.388.183.593a18.77 18.77 0 01.183.722l.011.048.003.013v.003h0l.117-.025zm18.47 13.425s0 0 0 0h0z"
        ></path>
        <path
          fill="#C1694F"
          d="M13.921 17.187c.038.266-.304.304-.228.532.076.227.418.949.722.873.303-.114.683-.076.151.152-.38.19-.645 0-.645 0s-.57-1.101-.531-1.405c.075-.304.531-.228.531-.152z"
        ></path>
        <path
          fill="#292F33"
          d="M17.452 16.086a.519.519 0 01-.531.531.519.519 0 01-.532-.531c0-.304.266-.228.57-.228.265 0 .493-.076.493.228zm-4.024 1.025c.038-.342 1.139-.266.76.114-.267.19-.836.417-.76-.114z"
        ></path>
        <path
          fill="#C1694F"
          d="M17.338 13.126c.38.114.835 1.708.684 1.746-.19.038-1.14-1.86-.684-1.746zm1.86 4.404s.76.987.19 1.708c-.57.722-1.746.456-1.746.456s1.139-.342 1.405-.911c.303-.57.151-1.253.151-1.253z"
        ></path>
        <path
          fill="#ECD88B"
          stroke="#000"
          strokeWidth="0.238"
          d="M16.76 15.033l.009.009.01.006c.016.011.032.035.032.076 0 .041-.017.086-.05.12l-.007.006-.005.007c-.086.115-.208.118-.256.086l-.114-.076-.006-.004-.006-.003-.01-.005a13.967 13.967 0 01-.4-.306c-.223-.18-.507-.414-.781-.65a13.21 13.21 0 01-.722-.66 3.864 3.864 0 01-.096-.102c.047.022.1.047.158.077.242.122.554.303.871.497.317.194.635.4.889.57.127.086.237.162.322.224.087.064.141.107.162.128zm-2.54-1.675v.002-.002z"
        ></path>
        <path
          fill="#AEAD7F"
          d="M14.984 13.772c-.038-.038-.114-.076-.152-.114v.038l-.114.114c-.038.038-.075.114-.114.114.039.076.114.114.152.152a.523.523 0 00.114-.152c.076-.038.114-.114.114-.152zm.494.57a.795.795 0 00.152-.228L15.402 14c0 .076-.038.152-.114.228-.038.076-.114.152-.152.19.038.038.114.075.152.151.076-.076.114-.152.19-.227zm.57.455c.075-.114.113-.19.151-.304l-.19-.114c0 .077-.038.152-.114.304-.076.114-.152.19-.227.19l.151.152.228-.228z"
        ></path>
        <path
          fill="#BE1E97"
          stroke="#000"
          strokeWidth="0.238"
          d="M24.404 24.03h0v-.007c0-.038.02-.086.06-.128.04-.045.077-.057.087-.057h.016c3.51-.492 5.737-.304 6.528-.192.122.033.208.114.208.225v.003l.266 10.477a.221.221 0 01-.223.22h-7.365a.204.204 0 01-.152-.077.287.287 0 01-.07-.18l.645-10.284z"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M27.284 27.325H26.07v-1.063H29.6v1.063h-1.215v4.821h-1.1v-4.821z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_13021_1144">
          <path
            fill="#fff"
            d="M0 0H27.335V27.335H0z"
            transform="translate(11.68 12.367)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

// getServerSideProps function
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from an API
  const res = await axios.get(
    `${process.env.API}/public/listing/${process.env.DAO}/leaderboard`
  );

  let leaderboard = res.data.data.leaderboard as LeaderboardType[];
  // Return the fetched data as props
  return {
    props: { leaderboard }, // Will be passed to the page component as props
  };
};

export default Leaderboard;
