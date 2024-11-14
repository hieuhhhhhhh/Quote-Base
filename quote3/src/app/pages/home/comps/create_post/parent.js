import { useState, useEffect } from "react";
import addPost from "../../helpers/submit_post";
import styles from "./create_post.module.css";

import { useDispatch } from "react-redux";
import { updateUserActions } from "@/components/redux/action";

import CPinput from "./input_post";
import CPauthor from "./author_post";
import CPdesign from "./design_post";
import CPpreview from "./preview_post";

export default function CPparent() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [img, setImg] = useState(null);
  const [BGcolor, setBGcolor] = useState(null);
  const [whiteText, setWhiteT] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

    useEffect(() => {
    if (page <= 0) {
      dispatch(updateUserActions({ isCreatingPost: false }));
    }
  }, [page, dispatch]);



  const onSubmit = async () => {
    try {
      const id = await addPost(content, author, img, BGcolor, whiteText);
      if (id) {
        dispatch(updateUserActions({ isCreatingPost: false }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onNext = () => {
    setPage(page + 1);
  };

  const onBack = () => {
    setPage(page - 1);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className={styles.closeButton}
          onClick={() => {
            dispatch(updateUserActions({ isCreatingPost: false }));
          }}
        >
          X
        </button>
        <div>
          {page === 1 && (
            <CPinput 
              content={content} 
              setContent={setContent} 
              onNext={onNext} />
          )}
         {page === 2 && (
            <CPauthor 
              author={author}
              setAuthor={setAuthor}
              onNext={onNext}
              onBack={onBack}/>
          )}

          {page === 3 && (
            <CPdesign
              content={content}
              author={author}
              img={img}
              setImg={setImg}
              BGcolor={BGcolor}
              setBGcolor={setBGcolor}
              whiteText={whiteText}
              setWhiteT={setWhiteT}
              onNext={onNext}
              onBack={onBack}
            />
          )}
          {page === 4 && (
            <CPpreview
              content={content}
              author={author}
              img={img}
              BGcolor={BGcolor}
              whiteText={whiteText}
              onFinish={onSubmit}
              onBack={onBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
