export default function buildStatusOptions(defValue) {
	let result = [];
	let options = [ { key: 1, value: "Enabled" }, { key: 0, value: "Disabled" } ];

	for(let option of options) {
		if(defValue == option.key)
			option.selected = true;

		result[result.length] = option;
	}

	return result;
}
