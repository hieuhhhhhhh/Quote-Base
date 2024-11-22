import styles from "./pfp.module.css";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

function BeforeCrop({ rawImg, setImg, setRawImg }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropInfo, setCropInfo] = useState(null);

  const onCropComplete = useCallback((_, cropInfo) => {
    setCropInfo(cropInfo);
  }, []);

  // Crop the image on canvas
  const onCrop = async () => {
    const image = new Image();
    image.src = rawImg;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = cropInfo.width;
      canvas.height = cropInfo.height;

      ctx.drawImage(
        image,
        cropInfo.x,
        cropInfo.y,
        cropInfo.width,
        cropInfo.height,
        0,
        0,
        cropInfo.width,
        cropInfo.height
      );

      const base64 = canvas.toDataURL("image/jpeg");
      setImg(base64);
      setRawImg(null);
    };
  };

  return (
    <div>
      <div className={styles.cropBox}>
        <Cropper
          image={rawImg}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <button onClick={onCrop}>Crop Image</button>
    </div>
  );
}
export default BeforeCrop;
