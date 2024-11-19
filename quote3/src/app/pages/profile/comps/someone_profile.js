import { useEffect, useState } from "react";
import { getBasicInfo } from "@/lib/front_end/user_info/basic_info";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info";
import styles from "../Profile.module.css";

function SomeoneProfile({ user_id }) {
  const [profile, setProfile] = useState({
    name: "",
    biography: "",
    pfp: "",
    pfpExist: true,
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
        name: basicData.name,
        biography: publicData.biography,
        pfp: publicData.profile_pic,
      }));

      if (publicData.profile_pic == "") {
        setProfile((prevProfile) => ({
          ...prevProfile,
          pfpExist: false,
        }));
      }
    };

    fetchProfileData();
  }, [user_id]);

  return (
    <div className={styles.container}>
      <div className={styles.profileContentMain}>
        <div className={styles.profileLeft}>
          <div className={styles.imgHolder}>
            <img
              src={profile.pfpExist ? profile.pfp : "/default_pfp.webp"} // if no pfp set default pfp
              className={styles.profilePic}
            />
          </div>
        </div>
        <div className={styles.profileRight}>
          <h2 className={styles.name}>{profile.name}</h2>
          <div className={styles.stats}>
            <p>0 posts</p>
          </div>
          <p className={styles.bio}>{profile.bio}</p>
        </div>
      </div>

      <div className={styles.profileContentSub}>
        <p>To be continued area ....</p>
      </div>
    </div>
  );
}

export default SomeoneProfile;
