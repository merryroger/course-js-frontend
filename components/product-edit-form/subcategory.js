import buildSelect from "../../lib/build-select-field.js";
import buildCategorySubcategoryOptions from "../../lib/build-category-subcategory-options.js";
import fetchJson from "../../../lib/fetch-json.js";
import getSelectValue from "../../lib/get-select-value.js";

let subcategory = {
	params: {
		label: "Category",
		key: "subcategory",
		id: "subcategory",
		size: 1,
		className: 'input__text__field',
		tabindex: 3
	},
	order: 4,
	build: async function(params, value) {
		let url = new URL('/api/rest/categories', location.href);
		let categories = await fetchJson(url);
		url = new URL('/api/rest/subcategories', location.href);
		let subcategories = await fetchJson(url);
		let options = buildCategorySubcategoryOptions(categories, subcategories, value);
		return buildSelect(params, options);
	},
	getValue: (form) => {
		let result = getSelectValue(form, "subcategory");
		result.subcategory = result.subcategory.split('.')[0];
		return result;
	}
}

export default subcategory;