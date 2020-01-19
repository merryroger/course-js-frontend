import buildNumberField from "../../lib/build-number-field.js";

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
	build: (params, value) => buildNumberField(params, value)
}

export default quantity;