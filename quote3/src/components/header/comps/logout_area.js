import Link from "next/link";
import { useDispatch } from "react-redux";
import removeToken from "@/lib/front_end/authentication/logout";
import { resetMyProfile, updateMyProfile } from "@/components/redux/action";

export default function LogOutArea({ children }) {
  const dispatch = useDispatch();
  // Clear all profile data to log out
  const clearUserData = () => {
    removeToken();
    dispatch(resetMyProfile());
    dispatch(updateMyProfile({ id: "" }));
  };

  return (
    <div>
      <Link href="/pages/login" onClick={clearUserData}>
        {children}
      </Link>
    </div>
  );
}
