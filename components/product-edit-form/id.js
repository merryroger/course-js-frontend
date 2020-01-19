import buildHiddenField from "../../lib/build-hidden-field.js";

let id = {
	params: {
		key: "id"
	},
	order: 0,
	build: (params, value) => buildHiddenField(params, value)
}

export default id;