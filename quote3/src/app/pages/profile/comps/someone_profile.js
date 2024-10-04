import { useEffect, useState } from "react";
import { getBasicInfo } from "@/lib/front_end/user_info/basic_info";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info";

function SomeoneProfile({ user_id }) {
  const [profile, setProfile] = useState({
    username: "",
    alias: "",
    biography: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      // Fetch basic info
      const basicData = await getBasicInfo(user_id);

      // Fetch public info
      const publicData = await getPublicInfo(user_id);

      // Update profile state with both sets of data
      setProfile((prevProfile) => ({
        ...prevProfile,
        username: basicData.username,
        alias: basicData.alias,
        biography: publicData.biography,
      }));
    };

    fetchProfileData();
  }, [user_id]);

  return (
    <div>
      <h1>Profile Information</h1>
      <div>This is NOT your profile.</div>
      <p>Username: {profile.username}</p>
      <p>Alias: {profile.alias}</p>
      <p>Biography: {profile.biography}</p> {/* Added bio to display */}
    </div>
  );
}

export default SomeoneProfile;
