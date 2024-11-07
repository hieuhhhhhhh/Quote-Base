import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info"; // Fetch biography
import styles from "../Profile.module.css";
import UploadProfilePic from "./profile_pic/upload_pfp";

function MyProfile() {
  // Accessing redux state
  const myName = useSelector((state) => state.myProfile.name);
  const myId = useSelector((state) => state.myProfile.id);

  const [moreOpen, setMoreOpen] = useState(false);

  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("");
  const [pfpExist, setPfpExist] = useState(true);

  useEffect(() => {
    // Fetch additional data not available in redux
    const fetchDB = async () => {
      const data = await getPublicInfo(myId);
      setBio(data.biography);
      if (data.profile_pic == "") {
        setPfpExist(false);
      }
      setPfp(data.profile_pic);
    };

    fetchDB();
  }, [myId]); // Re-fetch if myId changes

  const onUpdate = (pfp) => {
    setPfp(pfp);
    setPfpExist(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContentMain}>
        <div className={styles.profileLeft}>
          <div className={styles.imgHolder}>
            <img
              src={pfpExist ? pfp : "/default_pfp.webp"} // if no pfp set default pfp
              className={styles.profilePic}
            />
          </div>
        </div>
        <div className={styles.profileRight}>
          <h2 className={styles.name}>{myName}</h2>
          <div className={styles.stats}>
            <div>0 posts</div>
            <div>0 followers</div>
          </div>
          <div className={styles.bio}>{bio}</div>
        </div>
      </div>
      <UploadProfilePic onUpdate={onUpdate} />
      <button>Edit Profile</button>

      <div>
        <button
          onClick={() => {
            setMoreOpen(!moreOpen);
          }}
        >
          More
        </button>
        {moreOpen && (
          <span className={styles.rightModal}>
            <button onClick={() => alert("Log Out")}>Log Out</button>
          </span>
        )}
      </div>

      <div className={styles.profileContentSub}>
        <p>To be continued area ....</p>
      </div>
    </div>
  );
}

export default MyProfile;
