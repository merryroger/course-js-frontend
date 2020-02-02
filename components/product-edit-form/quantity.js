import buildNumberField from "../../lib/build-number-field.js";
import getInputValue from "../../lib/get-input-value.js";

let quantity = {
	params: {
		label: "Quantity",
		key: "quantity",
		id: "quantity",
		className: 'input__number__field formatted__width',
		placeholder: 'Quantity',
		tabindex: 6,
		required: true
	},
	order: 7,
	build: (params, value) => buildNumberField(params, value),
	getValue: (form) => getInputValue(form, "quantity")
}

export default quantity;