import buildNumberField from "../../lib/build-number-field.js";
import getInputValue from "../../lib/get-input-value.js";

let discount = {
	params: {
		label: "Discount ($)",
		key: "discount",
		id: "discount",
		className: 'input__number__field formatted__width',
		placeholder: 'Discount',
		tabindex: 5,
		required: true
	},
	order: 6,
	build: (params, value) => buildNumberField(params, value),
	getValue: (form) => getInputValue(form, "discount")
}

export default discount;