import ReactModal from "react-modal";
import UploadProfilePic from "../profile_pic/upload_pfp";
import Page2 from "@/app/pages/signup/comps/panel_page2";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "../../Profile.module.css";
import { updateUserActions } from "@/components/redux/action";

export default function MyProfileButtons({ onUpdatePFP }) {
  const ads = useSelector((state) => state.myProfile.ads);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className={styles.buttonsContainer}>
      <span>
        <Link
          href="/"
          onClick={() => {
            dispatch(updateUserActions({ isCreatingPost: true }));
          }}
          style={{ textDecoration: "none", color: "unset" }}
        >
          <button>
            <FontAwesomeIcon title="Write a Post" icon={faPenToSquare} />
            {" Write A Post"}
          </button>
        </Link>
      </span>
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
        <div style={{ marginLeft: "15px" }}>
          <UploadProfilePic onUpdate={onUpdatePFP} />
        </div>

        <Page2 closeModal={closeModal} />
      </ReactModal>
      {ads && (
        <Link href={"/pages/payment"}>
          <button>Remove Ads</button>
        </Link>
      )}
    </div>
  );
}
