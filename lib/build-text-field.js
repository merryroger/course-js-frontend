export default function buildTextField(params, value) {
  let { label = '', key, id, size = null, className = null, tabindex = -1, placeholder = null, required = false, autofocus = false } = params;
  let label_tag = (label != '') ? `<label for="${key}">${label}</label><br />` : ''; 
  let _id = (id) ? `id="${id}" ` : '';
  let tag_size = (size) ? ` size="${size}"` : '';
  let cName = (className) ? ` class="${className}"` : '';
  let tindex = ` tabindex="${tabindex}"`;
  let pholder = (placeholder) ? ` placeholder="${placeholder}"` : '';
  let req = (required) ? " required" : '';
  let afoc = (autofocus) ? " autofocus" : '';
      
  return `<div class="elem__${key}">${label_tag}<input type="text" ${_id}name="${key}" value="${value}"${tag_size}${cName}${tindex}${pholder}${req}${afoc} /></div>`;
}
