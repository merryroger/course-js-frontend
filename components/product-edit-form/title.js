import buildTextField from "../../lib/build-text-field.js";
import getInputValue from "../../lib/get-input-value.js";

let title = {
	params: {
		label: "Product name",
		key: "title",
		id: "title",
		className: 'input__text__field',
		placeholder: 'Product name',
		tabindex: 1,
		required: true,
		autofocus: true
	},
	order: 1,
	build: (params, value) => buildTextField(params, value),
	getValue: (form) => getInputValue(form, "title")
}

export default title;