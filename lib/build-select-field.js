export default async function buildSelect(params, option_set) {
  let { label = '', key, id, size = 1, className = null, tabindex = -1, required = false, autofocus = false, multiple = false } = params;
  let label_tag = (label != '') ? `<label for="${key}">${label}</label><br />` : '';
  let _id = (id) ? `id="${id}" ` : '';
  let tag_size = (size) ? ` size="${size}"` : '';
  let cName = (className) ? ` class="${className}"` : '';
  let tindex = ` tabindex="${tabindex}"`;
  let req = (required) ? " required" : '';
  let afoc = (autofocus) ? " autofocus" : '';
  let mul = (multiple) ? " multiple" : '';

  let options = [];

  for(let { key, value, selected = false} of option_set) {
	let sel = (selected) ? " selected" : "";

	options[options.length] = `<option key="${key}"${sel}>${value}</option>`;
  }

  return `<div class="elem__${key}">${label_tag}<select ${_id}name="${key}" ${tag_size}${cName}${tindex}${req}${afoc}${mul}>${options.join('')}</select></div>`;
}
