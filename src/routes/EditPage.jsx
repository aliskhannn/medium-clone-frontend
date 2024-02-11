import EditorJS from "@editorjs/editorjs";
import { useContext, useEffect } from "react";
import { useRef } from "react";
import { EDITOR_JS_TOOLS } from "../tools/tools";
import { useDispatch } from "react-redux";
import { getUserById } from "../store/slices/users/usersSlice";
import { RootContext } from "./Root";

const EditPage = () => {
  const {
    ejInstance,
    title,
    setTitle,
    contentIsNotEmpty,
    setContentIsNotEmpty,
  } = useContext(RootContext);

  const dispatch = useDispatch();

  const titleEl = useRef();

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: EDITOR_JS_TOOLS,
      data: {},
      placeholder: "Let`s write an awesome story!",
      defaultBlock: "paragraph",
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async (api, event) => {
        let content = await api.saver.save();
        if (content.blocks.length) setContentIsNotEmpty(true);
        else setContentIsNotEmpty(false);
      },
    });
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    observer.observe(titleEl.current, config);

    dispatch(getUserById(8));

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const callback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "characterData") {
        setTitle(titleEl.current.innerHTML);
      } else if (mutation.type === "attributes") {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  return (
    <div className="edit-page pt-12">
      <div className="container">
        <h1
          ref={titleEl}
          contentEditable={true}
          data-placeholder="Title"
          className="font-bold"
        ></h1>
        <div id="editorjs" className="text-lg"></div>
      </div>
    </div>
  );
};

export default EditPage;
