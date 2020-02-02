import buildImageSet from "../../lib/build-image-set.js";
import getImagesSet from "../../lib/get-image-set.js";

let images = {
	params: {
		label: "Images",
		key: "images",
		id: "images",
		name: "images",
		className: 'image__gallery__field',
	},
	order: 3,
	build: (params, value) => buildImageSet(params, value),
	getValue: (form) => getImagesSet(form, "images")
}

export default images;