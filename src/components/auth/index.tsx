"use client";
import Image from "next/image";
import axios from "axios";
axios.defaults.withCredentials = true;
import { use, useEffect, useState } from "react";
import { Close } from "../../svgs";
import { disconnect } from "@wagmi/core";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";

import { useQueryClient } from "@tanstack/react-query";

async function handleCredentialResponse(response: any) {
  // console.log("Encoded JWT ID token: " + response.credential);
  let body = {
    token: response.credential,
  };
  body = {
    token: response.credential,
  };
  let res = await axios.post(`${process.env.API}/login/google`, body);
  if (res.status == 200) {
    let jwt = res.data.data.token;
    localStorage.setItem("token", `Bearer ${jwt}`);

    location.reload();
  } else {
    alert("SignUp failed Please try Again");
  }
}

function signUpGoogle() {
  let win = window as any;
  win.google.accounts.id.initialize({
    client_id: process.env.GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  });
  win.google.accounts.id.renderButton(
    document.getElementById("google-login"),
    { theme: "outline", size: "large" }
    // customization attributes
  );
  win.google.accounts.id.prompt(); // also display the One Tap dialog
}

export default function Auth({ close }: { close: () => void }) {
  const [walletTrigger, setwalletTrigger] = useState(0);
  const [selectedAuth, setselectedAuth] = useState<string>("Email");

  useEffect(() => {
    setTimeout(() => {
      signUpGoogle();
    }, 0);
  }, [selectedAuth]);

  return (
    <div className="flex w-full h-screen justify-center items-center bg-[#00000023] fixed z-50 ">
      <span
        onClick={() => {
          close();
        }}
        className="absolute top-5 right-6 p-1 bg-white rounded-full"
      >
        <Close />
      </span>
      {walletTrigger > 0 && (
        <WalletAuthTrigger
          key={walletTrigger + "trigger"}
          walletTrigger={walletTrigger}
          setwalletTrigger={setwalletTrigger}
        />
      )}

      <span className="flex flex-col w-[378px] min-h-[242px] bg-white p-4 rounded-lg">
        <h3 className="text-[20px] font-normal">Let’s start by</h3>
        <h1 className="text-[24px] font-semibold">Login/Sign-up</h1>
        <p className="text-[14px] font-normal m-0 p-0 mt-[16px]">
          Login/Sign-up through wallet or Google Account to start your web3
          journey. Don’t worry, we don’t store any data !
        </p>

        <div className="flex w-full gap-6 mt-6 relative z-20">
          {["Email", "Wallet"].map((item, index) => {
            return (
              <p
                onClick={() => {
                  setselectedAuth(item);
                }}
                className={`z-10 border-b-[2px] ${
                  selectedAuth == item ? "border-[#000000]" : "border-[#CACDD5]"
                } text-[16px] font-semibold m-0 p-0  cursor-pointer pb-1`}
                key={"opt " + index}
              >
                {item}
              </p>
            );
          })}
          {/* line */}
          <div className="bg-[#CACDD5] h-[2px] w-full flex absolute bottom-0"></div>
        </div>
        {selectedAuth == "Email" && (
          <span style={{ marginTop: "15px" }} id={"google-login"}></span>
        )}
        {/* <ConnectButton /> */}
        {selectedAuth == "Wallet" && (
          <button
            className="bg-[#ffffff] text-[#000000] rounded-[8px] w-full h-[48px] mt-[16px] cursor-pointer"
            onClick={async () => {
              setwalletTrigger((st) => st + 1);
            }}
          >
            Wallet Connect
          </button>
        )}
      </span>
    </div>
  );
}

const WalletAuthTrigger = ({
  walletTrigger,
  setwalletTrigger,
}: {
  walletTrigger: number;
  setwalletTrigger: (st: number) => void;
}) => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected, isConnecting } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setisLoading] = useState(false);

  let queryClient = useQueryClient();

  let chain = "EVM";

  useEffect(() => {
    if (isConnected) {
      walletAuthApi();
    }
  }, [isConnected]);

  const walletAuthApi = async () => {
    setisLoading(true);
    let res_nonce = await axios.get(
      `${process.env.API}/login/wallet?address=${address}&chain=${chain}`
    );
    if (res_nonce.status == 200) {
      // Solana Ethereum
      let message = res_nonce.data.data.nonce;
      let public_key = address;

      let signature;

      signature = await signMessageAsync({ message });

      let auth_res = await axios.post(
        `${process.env.API}/login/wallet/verify`,
        {
          public_key,
          signature,
          chain,
        }
      );
      localStorage.setItem("token", `Bearer ${auth_res.data.data.token}`);

      if (auth_res.status == 200) {
        location.reload();
        queryClient.invalidateQueries(["auth"]);
        setwalletTrigger(0);
      }
    }
    setisLoading(false);
  };

  useEffect(() => {
    disconnect().then(() => {
      openConnectModal!();
    });
  }, []);

  if (isLoading) {
    return <h1>Loader</h1>;
  }

  return <></>;
};
