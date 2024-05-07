import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../tools/tools';

const useEditor = (holderId, ejInstance, usedForCreate, setContentIsNotEmpty) => {

	const initEditorJS = async (editorData = null, isEditing = false, author = null) => {
		const editor = new EditorJS({
			holder: holderId,
			tools: usedForCreate === "post" ? EDITOR_JS_TOOLS : {},
			data: usedForCreate === "post" && isEditing ?
				editorData?.data?.content :
				usedForCreate === "comment-reply" && isEditing ?
					editorData?.content : {},
			placeholder: usedForCreate === "comment" || usedForCreate === "comment-reply" && isEditing ?
				"What are your thoughts?" : usedForCreate === "comment-reply" ? `Replying to ${author}` : '',
			defaultBlock: "paragraph",
			autofocus: !isEditing && usedForCreate === "post",
			onReady: () => {
				ejInstance.current = editor;
			},
			onChange: async (api) => {
				let content = await api.saver.save();
				if (content.blocks.length) setContentIsNotEmpty(true);
				else setContentIsNotEmpty(false);
			},
		});
	};

	return { initEditorJS };
}

export default useEditor;