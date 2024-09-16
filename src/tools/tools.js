import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import Paragraph from '@editorjs/paragraph'

export const EDITOR_JS_TOOLS = {
	embed: Embed,
	table: Table,
	marker: Marker,
	list: List,
	warning: Warning,
	code: Code,
	linkTool: LinkTool,
	image: {
		class: Image,
		config: {
			endpoints: {
				byFile: `${import.meta.env.VITE_API_URL}/upload`, // Your backend file uploader endpoint
				byUrl: `${import.meta.env.VITE_API_URL}/fetchUrl`, // Your endpoint that provides uploading by Url
			},
			additionalRequestHeaders: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}
	},
	raw: Raw,
	header: {
		class: Header,
		inlineToolbar: true,
		config: {
			placeholder: "Title",
			levels: [1, 2, 3, 4, 5, 6],
			defaultLevel: 1
		},
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
		config: {
			placeholder: 'Let`s write an awesome story!'
		},
	},
	quote: Quote,
	checklist: CheckList,
	delimiter: Delimiter,
	inlineCode: InlineCode,
	simpleImage: SimpleImage,
}