import * as fields from "./fields.js";

export default async function(form) {
	let formData = {};
	for(let elem of form) {
		if(fields[elem.name] == null || fields[elem.name].getValue == null) {
			continue;
		}
		
		Object.assign(formData, fields[elem.name].getValue(form));
	}

	return formData;
}