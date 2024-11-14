import styles from "./background_img.module.css";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function Cropping({ rawImg, aspect, onDone }) {
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
      onDone(base64);
    };
  };

  const onCancel = () => {
    onDone();
  };

  return (
    <div>
      <div className={styles.cropBox}>
        <Cropper
          image={rawImg}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className={styles.footerButtons}>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onCrop}>Crop Image</button>
      </div>
    </div>
  );
}
