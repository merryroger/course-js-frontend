export default function buildTextArea(params, value) {
  let { label = '', key, id, rows = null, cols = null, className = null, tabindex = -1, placeholder = null, required = false, autofocus = false } = params;
  let label_tag = (label != '') ? `<label for="${key}">${label}</label><br />` : '';
  let _id = (id) ? `id="${id}" ` : '';
  let tag_rows = (rows) ? ` rows="${rows}"` : '';
  let tag_cols = (cols) ? ` cols="${cols}"` : '';
  let cName = (className) ? ` class="${className}"` : '';
  let tindex = ` tabindex="${tabindex}"`;
  let pholder = (placeholder) ? ` placeholder="${placeholder}"` : '';
  let req = (required) ? " required" : '';
  let afoc = (autofocus) ? " autofocus" : '';
      
  return `<div class="elem__${key}">${label_tag}<textarea ${_id}name="${key}" ${tag_rows}${tag_cols}${cName}${tindex}${pholder}${req}${afoc}>${value}</textarea></div>`;
}
