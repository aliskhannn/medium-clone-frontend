import EditorJS from "@editorjs/editorjs";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { EDITOR_JS_TOOLS } from "../tools/tools";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../store/slices/posts/postsSlice";
import { getUserById } from "../store/slices/users/usersSlice";

const EditPage = () => {
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user.item);

  const titleEl = useRef();
  const ejInstance = useRef();

  let data = useRef({});
  let postCreatedDate = useRef("");
  let title = useRef("");
  let contentIsNotEmpty = useRef(true);

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
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    // Start observing the target node for configured mutations
    observer.observe(titleEl.current, config);

    dispatch(getUserById(8));

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [titleEl?.current?.innerText]);

  const canPublish =
    [title.current, contentIsNotEmpty.current].every(Boolean) &&
    requestStatus === "idle";

  const handlePublish = () => {
    if (!canPublish) {
      console.log(canPublish);
      try {
        setRequestStatus("pending");
        ejInstance.current
          .save()
          .then((outputData) => {
            postCreatedDate.current = new Date();
            data.current = outputData;
            dispatch(
              addNewPost({
                created_date: postCreatedDate.current,
                title: title.current,
                body: data.current,
                user: currentUser,
              })
            ).unwrap();
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const callback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "characterData") {
        title.current = titleEl.current.innerHTML;
      } else if (mutation.type === "attributes") {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  return (
    <div className="edit-page">
      <div className="container">
        <button onClick={() => handlePublish()}>Save</button>
        <h1 ref={titleEl} contentEditable={true} data-placeholder="Title"></h1>
        <div id="editorjs" className="text-lg"></div>
      </div>
    </div>
  );
};

export default EditPage;
