import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPublicInfo } from "@/lib/front_end/user_info/public_info"; // Fetch biography
import styles from "../Profile.module.css";
import UploadProfilePic from "./profile_pic/upload_pfp";
import Page2 from "../../signup/comps/panel_page2";
import ReactModal from "react-modal";

import Posts from "@/app/pages/profile/comps/profile_posts/user_posts";
import SavedPosts from "@/app/pages/profile/comps/profile_posts/user_saved_posts";

import Link from "next/link";

function MyProfile() {
  // Accessing redux state
  const myName = useSelector((state) => state.myProfile.name);
  const myBio = useSelector((state) => state.myProfile.bio);
  const myRole = useSelector((state) => state.myProfile.role);
  const myId = useSelector((state) => state.myProfile.id);
  const ads = useSelector((state) => state.myProfile.ads);

  const [moreOpen, setMoreOpen] = useState(false);

  //const [bio, setBio] = useState(myBio);
  const [pfp, setPfp] = useState("");
  const [pfpExist, setPfpExist] = useState(true);

  const [onShrink, setOnShrink] = useState(false);

  const [myPostsMode, setMyPostsMode] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Fetch additional data not available in redux
    const fetchDB = async () => {
      const data = await getPublicInfo(myId);
      //setBio(data.biography);
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
    <>
      <div className={styles.container}>
        <div className={onShrink ? "shrinkForDetails" : ""}>
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
              <div className={styles.bio}>{myBio}</div>
              <div className={styles.bio}>Role: {myRole}</div>
            </div>
          </div>
        </div>

        <UploadProfilePic onUpdate={onUpdate} />
        <button onClick={openModal}>Edit Profile</button>

        <ReactModal
          ariaHideApp={false}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Profile Form"
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
          className={styles.AddInfoModalContent}
        >
          <h2>Edit Profile</h2>
          <Page2 closeModal={closeModal} />
        </ReactModal>

        <div className={styles.btnMore}>
          <button
            onClick={() => {
              setMoreOpen(!moreOpen);
            }}
          >
            More
          </button>
          {moreOpen && (
            <div className={styles.rightModal}>
              <Link href={"/pages/login/logout"}>
                <button>Log Out</button>
              </Link>
            </div>
          )}
        </div>
        {ads && (
          <div>
            <Link href={"/pages/payment"}>
              <button>Remove Ads</button>
            </Link>
          </div>
        )}
        <div>
          <button onClick={() => setMyPostsMode(!myPostsMode)}>
            {myPostsMode ? "Saved Posts" : "My Posts"}
          </button>
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
