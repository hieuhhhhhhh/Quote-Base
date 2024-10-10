import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info"; // Fetch biography
import styles from "../Profile.module.css";
import UploadProfilePic from "./profile_pic/upload_pfp";

function MyProfile() {
  // Accessing redux state
  const myUsername = useSelector((state) => state.myProfile.username);
  const myAlias = useSelector((state) => state.myProfile.alias);
  const myId = useSelector((state) => state.myProfile.id);

  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("");

  useEffect(() => {
    // Fetch additional data not available in redux
    const fetchDB = async () => {
      const data = await getPublicInfo(myId);
      setBio(data.biography);
      setPfp(`${data.profile_pic}?t=${new Date().getTime()}`);
    };

    fetchDB();
  }, [myId]); // Re-fetch if myId changes

  const onUpdate = (pfp) => {
    setPfp(pfp);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContentMain}>
        <div className={styles.profileLeft}>
          <img src={pfp} className={styles.profilePic} />
        </div>
        <div className={styles.profileRight}>
          <h2 className={styles.username}>{myUsername}</h2>
          <p>{myAlias}</p>
          <div className={styles.stats}>
            <div>30 posts</div>
            <div>15 followers</div>
          </div>
          <div className={styles.bio}>{bio}</div>
        </div>
      </div>
      <UploadProfilePic onUpdate={onUpdate} />
      <div className={styles.profileContentSub}>
        <p>To be continued area ....</p>
      </div>
    </div>
  );
}

export default MyProfile;
