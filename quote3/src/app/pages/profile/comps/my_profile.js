// useSelector count: 3

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info"; // Import the function to fetch biography

function MyProfile() {
  // Accessing redux:
  const myUsername = useSelector((state) => state.myProfile.username);
  const myAlias = useSelector((state) => state.myProfile.alias);
  const myId = useSelector((state) => state.myProfile.myId);

  const [bio, setBio] = useState("");

  useEffect(() => {
    // fetch other data that redux not have:
    const fetchDB = async () => {
      try {
        const data = await getPublicInfo(myId);
        setBio(data.biography);
      } catch (error) {
        console.log("Error (my_profile.js): ", error.message);
      }
    };

    fetchDB();
  }, [myId]); // re-fetch if my id changes

  return (
    <div>
      <h1>Profile Information</h1>
      <div>This is your profile.</div>
      <p>Username: {myUsername}</p>
      <p>Alias: {myAlias}</p>
      <p>Biography: {bio}</p> {/* Display the biography */}
    </div>
  );
}

export default MyProfile;
