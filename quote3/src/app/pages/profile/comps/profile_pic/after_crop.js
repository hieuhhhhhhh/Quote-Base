import styles from "./pfp.module.css";

function AfterCrop({ img, setImg, onSubmit, onUpdate }) {
  const onClose = () => {
    setImg(null);
  };

  const onSave = () => {
    onUpdate(img);

    setImg(null);
    onSubmit();
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className={styles.cropBox}>
          <div className={styles.imgHolder}>
            <img className={styles.img} src={img} alt="Cropped Image" />
          </div>
        </div>

        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
export default AfterCrop;
