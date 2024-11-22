"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import removeToken from "@/lib/front_end/authentication/logout";
import { resetMyProfile, updateMyProfile } from "@/components/redux/action";
import LogIn from "../comps/panel";

export default function LogOut() {
  const dispatch = useDispatch();

  // Clear all profile data to log out
  const clearUserData = () => {
    removeToken();
    dispatch(resetMyProfile());
  };

  useEffect(() => {
    clearUserData();
  }, []);

  return <LogIn />;
}
