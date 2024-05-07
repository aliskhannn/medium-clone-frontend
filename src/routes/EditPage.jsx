import { useContext, useEffect } from "react";
import { useRef } from "react";
import { RootContext } from "./Root";
import { useParams } from "react-router-dom";
import useMessage from "./../hooks/useMessage";
import axios from "../http/index";
import useObserver, { config } from "../hooks/useObserver";
import useEditor from "../hooks/useEditor";

const EditPage = () => {
  const { id } = useParams();
  const { ejInstance, titleEl, setTitle, setContentIsNotEmpty } = useContext(RootContext);
  const { initEditorJS } = useEditor("editorjs", ejInstance, "post", setContentIsNotEmpty);
  const observer = useObserver(titleEl, setTitle);
  const { error } = useMessage();

  const isEditing = Boolean(id);

  let editorData;

  const initEditor = async () => {
    if (isEditing) {
      editorData = await axios.get(`/posts/${id}`).catch((err) => {
        error("Error getting post");
      });
      titleEl.current.innerHTML = editorData?.data?.title;
      setTitle(editorData?.data?.title);
    }

    initEditorJS(editorData, isEditing);
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    observer.observe(titleEl.current, config);

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div className='edit-page pt-12'>
      <div className='container'>
        <h1
          ref={titleEl}
          contentEditable={true}
          data-placeholder='Title'
          className='font-bold'
        ></h1>
        <div id='editorjs' className='text-lg'></div>
      </div>
    </div>
  );
};

export default EditPage;
