import buildImageSet from "../../lib/build-image-set.js";

let images = {
	params: {
		label: "Images",
		key: "images",
		id: "images",
		className: 'image__gallery__field',
	},
	order: 3,
	build: (params, value) => buildImageSet(params, value)
}

export default images;