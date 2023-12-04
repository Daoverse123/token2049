import React, { useState, useEffect } from "react";
import axios from "axios";

function useUser() {
  const [isLogedIn, setisLogedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [user, setuser] = useState<{ name: string; photo: string }>();

  const fetchUser = async () => {
    let res = await axios.get(`${process.env.API}/user`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    if (res.status == 200) {
      setisLoading(false);
      setuser({
        name: res.data.data.user.name,
        photo: res.data.data.user.photo.secure_url,
      });
    } else {
      setisLogedIn(false);
      setisLoading(false);
    }
    console.log(res.data);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setisLogedIn(true);
      fetchUser();
    }
  }, []);

  return {
    isLogedIn,
    isLoading,
    user,
  };
}

export default useUser;
