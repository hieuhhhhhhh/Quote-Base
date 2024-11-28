import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info"; // Fetch biography
import styles from "../Profile.module.css";

import Posts from "@/app/pages/profile/comps/profile_posts/user_posts";
import SavedPosts from "@/app/pages/profile/comps/profile_posts/user_saved_posts";

import MyProfileButtons from "./my_profile_btns/my_profile_btns";

function MyProfile() {
  // Accessing redux state
  const myName = useSelector((state) => state.myProfile.name);
  const myBio = useSelector((state) => state.myProfile.bio);
  const myId = useSelector((state) => state.myProfile.id);
  const [postCount, setPostCount] = useState(null);

  //const [bio, setBio] = useState(myBio);
  const [pfp, setPfp] = useState("");
  const [pfpExist, setPfpExist] = useState(true);

  const [onShrink, setOnShrink] = useState(false);

  const [myPostsMode, setMyPostsMode] = useState(true);

  useEffect(() => {
    // Fetch additional data not available in redux
    const fetchDB = async () => {
      const data = await getPublicInfo(myId);
      //setBio(data.biography);
      if (data.profile_pic == "") {
        setPfpExist(false);
      }
      setPfp(data.profile_pic);
      setPostCount(data.post_count);
      console.log(data);
    };

    fetchDB();
  }, [myId]); // Re-fetch if myId changes

  const onUpdatePFP = (pfp) => {
    setPfp(pfp);
    setPfpExist(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={onShrink ? "shrinkForDetails" : ""}>
          <div className={styles.profileContentMain}>
            <div className={styles.profileLeft}>
              <div className={styles.imgHolder}>
                <img
                  src={pfpExist ? pfp : "/default_pfp.webp"} // if no pfp set default pfp
                  alt="Profile Picture"
                  className={styles.profilePic}
                />
              </div>
            </div>
            <div className={styles.profileRight}>
              <h2 className={styles.name}>{myName}</h2>
              <h3 className={styles.bio}>
                {myBio || "Write a short bio here!"}
              </h3>
              <div className={styles.stats}>
                <div>{postCount} posts</div>
              </div>
              <br />

              <MyProfileButtons onUpdatePFP={onUpdatePFP} />
            </div>
          </div>
          <div className={styles.tabs}>
            <button
              className={myPostsMode ? styles.activeTab : ""}
              onClick={() => {
                setMyPostsMode(true);
                setOnShrink(false);
              }}
            >
              My Posts
            </button>
            <button
              className={!myPostsMode ? styles.activeTab : ""}
              onClick={() => {
                setMyPostsMode(false);
                setOnShrink(false);
              }}
            >
              Saved
            </button>
          </div>
        </div>

        <div>
          {myPostsMode ? (
            <Posts user_id={myId} onShrink={setOnShrink} />
          ) : (
            <SavedPosts user_id={myId} onShrink={setOnShrink} />
          )}
        </div>
      </div>
    </>
  );
}

export default MyProfile;
