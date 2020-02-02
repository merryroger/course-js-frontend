import buildHiddenField from "../../lib/build-hidden-field.js";
import getInputValue from "../../lib/get-input-value.js";

let id = {
	params: {
		key: "id"
	},
	order: 0,
	build: (params, value) => buildHiddenField(params, value),
	getValue: (form) => getInputValue(form, "id")
}

export default id;