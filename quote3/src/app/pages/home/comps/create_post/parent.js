import { useState, useEffect } from "react";
import addPost from "../../helpers/submit_post";

import { useDispatch } from "react-redux";
import { updateUserActions } from "@/components/redux/action";

import CPpage1 from "./page1";
import CPpage2 from "./page2";
import CPpage3 from "./page3";
import CPpage4 from "./page4";

export default function CPparent() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [img, setImg] = useState(null);
  const [BGcolor, setBGcolor] = useState(null);
  const [whiteText, setWhiteT] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const dispatch = useDispatch();

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
        <button
          onClick={() => {
            dispatch(updateUserActions({ isCreatingPost: false }));
          }}
        >
          Close All
        </button>
        {page === 1 && (
          <CPpage1 content={content} setContent={setContent} onNext={onNext} />
        )}
        {page === 2 && (
          <CPpage2
            author={author}
            setAuthor={setAuthor}
            onNext={onNext}
            onBack={onBack}
          />
        )}
        {page === 3 && (
          <CPpage3
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
          <CPpage4
            content={content}
            author={author}
            img={img}
            BGcolor={BGcolor}
            whiteText={whiteText}
            onNext={onNext}
            onFinish={onSubmit}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
}
