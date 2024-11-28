import { useEffect, useState } from "react";
import { getBasicInfo } from "@/lib/front_end/user_info/basic_info";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info";
import Posts from "./profile_posts/user_posts";
import styles from "../Profile.module.css";

function SomeoneProfile({ user_id }) {
  const [profile, setProfile] = useState({
    name: "",
    biography: "",
    pfp: "",
    pfpExist: true,
    postCount: null,
  });

  const [onShrink, setOnShrink] = useState(false);

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
        postCount: publicData.post_count,
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
      <div className={onShrink ? "shrinkForDetails" : ""}>
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
              {profile.postCount && <p>{profile.postCount} posts</p>}
            </div>
            <p className={styles.bio}>{profile.bio}</p>
          </div>
        </div>
      </div>

      <div>
        <Posts user_id={user_id} onShrink={setOnShrink} />
      </div>
    </div>
  );
}

export default SomeoneProfile;
