import buildTextArea from "../../lib/build-textarea-field.js";

let description = {
	params: {
		label: "Description",
		key: "description",
		id: "description",
		className: 'input__text__field',
		placeholder: 'Description',
		tabindex: 2,
		required: true
	},
	order: 2,
	build: (params, value) => buildTextArea(params, value)
}

export default description;