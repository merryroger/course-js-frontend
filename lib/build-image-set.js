import buildImageItem from "./build-image-item.js";

export default function buildImageSet(params, image_set) {
  let { label = '', key, id, name, className = null } = params;
  let label_tag = (label != '') ? `<label for="${key}">${label}</label><br />` : '';
  let _id = (id) ? `id="${id}" ` : '';
  let _name = (name) ? `name="${name}" ` : '';
  let cName = (className) ? ` class="${className}"` : '';

  let items = [];

  for(let image_data of image_set) {
    items[items.length] = buildImageItem(image_data);
  }

  let controls = `<div class="image__load__controls"><button type="button"${_name} class="image__load__button formatted__width">Upload</button></div>`;

  return `<div class="elem__${key}">${label_tag}<div ${_id}${cName}>${items.join('')}</div>${controls}</div>`;
}
