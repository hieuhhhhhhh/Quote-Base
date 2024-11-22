// BG = background
// T = text
import { useState, useEffect } from "react";
import Cropping from "./background_img/cropping";
import ImgInput from "./background_img/img_input";
import update_FontSize_Width from "@/lib/front_end/post/dynamic_fontsize_width";
import Preview from "./others/preview";
import BackgroundColor from "./others/background_color";
import TextColor from "./others/text_color";
import styles from "./create_post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faFont } from "@fortawesome/free-solid-svg-icons";

export default function CPdesign({
  content,
  author,
  img,
  setImg,
  BGcolor,
  setBGcolor,
  whiteText,
  setWhiteT,
  onNext,
  onBack,
}) {
  const [page, setPage] = useState(PAGE.DEFAULT);
  const [rawImg, setRawImg] = useState(null);
  const [width, setWidth] = useState("");
  const [fontSize, setFontSize] = useState("");

  useEffect(() => {
    const concat = content + "\n" + "- " + author;
    update_FontSize_Width(concat, setFontSize, setWidth);
  }, []);

  const onFinish = () => {
    onNext();
  };

  const PreviewComp = ({
    testImg = img,
    testBGcolor = BGcolor,
    testWT = whiteText,
  }) => (
    <Preview
      width={width}
      fontSize={fontSize}
      content={content}
      author={author}
      img={testImg}
      BGcolor={testBGcolor}
      whiteText={testWT}
    />
  );
  const onImageUploaded = (img) => {
    if (img) {
      setImg(img);
      setBGcolor(null);
    }
    setPage(PAGE.DEFAULT);
  };

  const onBGcolorUpdate = (color) => {
    if (color != BGcolor) {
      setBGcolor(color);
      setImg(null);
    }
    setPage(PAGE.DEFAULT);
  };

  const onTextColorUpdate = (isWhite) => {
    setWhiteT(isWhite);
    setPage(PAGE.DEFAULT);
  };

  switch (page) {
    case PAGE.UPLOAD_PIC:
      return (
        <Cropping
          rawImg={rawImg}
          aspect={Number(width.slice(0, -2)) / 190}
          onDone={onImageUploaded}
        />
      );
    case PAGE.BG_COLOR:
      return (
        <BackgroundColor
          preview={PreviewComp}
          BGcolor={BGcolor}
          onDone={onBGcolorUpdate}
        />
      );
    case PAGE.TEXT_COLOR:
      return (
        <TextColor
          preview={PreviewComp}
          whiteText={whiteText}
          onDone={onTextColorUpdate}
        />
      );
    case PAGE.DEFAULT:
    default:
      return (
        <div>
          <div className={styles.iconRow}>
            <div>
              <ImgInput
                setRawImg={setRawImg}
                onDone={() => setPage(PAGE.UPLOAD_PIC)}
              />
            </div>
            <div onClick={() => setPage(PAGE.BG_COLOR)}>
              <FontAwesomeIcon icon={faPalette} title="Set Background Color" />
            </div>
            <div onClick={() => setPage(PAGE.TEXT_COLOR)}>
              <FontAwesomeIcon icon={faFont} title="Set Text Color" />
            </div>
          </div>

          <PreviewComp />

          <div className={styles.footerButtons}>
            <button onClick={onBack}>Back</button>
            <button onClick={onFinish}>Next</button>
          </div>
        </div>
      );
  }
}

// Define enum values as integers
const PAGE = {
  DEFAULT: 0,
  UPLOAD_PIC: 1,
  BG_COLOR: 2,
  TEXT_COLOR: 3,
};
