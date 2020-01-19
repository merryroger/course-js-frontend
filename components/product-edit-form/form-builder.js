import * as fields from "./fields.js";

export default async function(data) {
	let form = [];

	for(let [field, value] of Object.entries(data)) {
		if(fields[field] === undefined)
			continue;

		form[+fields[field].order] = await fields[field].build(fields[field].params, value);
	}

	return form.join('');
}