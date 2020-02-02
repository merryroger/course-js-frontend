import buildSelect from "../../lib/build-select-field.js";
import buildStatusOptions from "../../lib/build-status-options.js";
import getSelectValue from "../../lib/get-select-value.js";

let status = {
	params: {
		label: "Status",
		key: "status",
		id: "status",
		size: 1,
		className: 'input__text__field formatted__width',
		tabindex: 7
	},
	order: 8,
	build: function(params, value) {
		let options = buildStatusOptions(value);
		return buildSelect(params, options);
	},
	getValue: (form) => getSelectValue(form, "status")
}

export default status;