import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info"; // Fetch biography
import styles from "../Profile.module.css";

function MyProfile() {
  // Accessing redux state
  const myUsername = useSelector((state) => state.myProfile.username);
  const myAlias = useSelector((state) => state.myProfile.alias);
  const myId = useSelector((state) => state.myProfile.myId);

  const [bio, setBio] = useState("");

  useEffect(() => {
    // Fetch additional data not available in redux
    const fetchDB = async () => {
      const data = await getPublicInfo(myId);
      setBio(data.biography);
    };

    fetchDB();
  }, [myId]); // Re-fetch if myId changes

  return (
    <div className={styles.container}>
      <div className={styles.profileContentMain}>
        <div className={styles.profileLeft}>
          <img
            src="/default-profile-image.jpg"
            alt="Profile"
            className={styles.profilePic}
          />
        </div>
        <div className={styles.profileRight}>
          <h2 className={styles.username}>{myUsername}</h2>
          <p>{myAlias || "My Alias"}</p>
          <div className={styles.stats}>
            <div>30 posts</div>
            <div>15 followers</div>
          </div>
          <div className={styles.bio}>{bio}</div>
        </div>
      </div>
      <div className={styles.profileContentSub}>
        <p>To be continued area ....</p>
      </div>
    </div>
  );
}

export default MyProfile;
