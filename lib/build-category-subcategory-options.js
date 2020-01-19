export default function buildCategorySubcategoryOptions(categories, subcategories, defValue) {
	let cat_set = {};
	let result = [];

	for(let cat_values of categories) {
		cat_set[cat_values.id] = cat_values.title;
	}

	for(let subcat_set of subcategories) {
		let option = {};
		option.key = `${subcat_set.id}.${subcat_set.category}`;
		option.value = `${cat_set[subcat_set.category]} > ${subcat_set.title}`;
		if(defValue == subcat_set.id)
			option.selected = true;

		result[result.length] = option;
	}

	result.sort((item1, item2) => { return (item1.value > item2.value) ? 1 : -1 });

	return result;
}
