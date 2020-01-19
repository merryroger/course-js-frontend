import buildNumberField from "../../lib/build-number-field.js";

let price = {
	params: {
		label: "Price ($)",
		key: "price",
		id: "price",
		className: 'input__number__field formatted__width',
		placeholder: 'Price',
		tabindex: 4,
		required: true
	},
	order: 5,
	build: (params, value) => buildNumberField(params, value)
}

export default price;