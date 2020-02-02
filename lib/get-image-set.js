export default function getImageSet(form, key) {
	let images = [];
	let iSet = Array.from(form.querySelector(`div#${key}`).children);
	for(let iItem of iSet) {
		let image = {
			url: iItem.querySelector("img").src,
			source: iItem.querySelector(".image__source").innerHTML
		}

		images[images.length] = image;
	}
    return { [key]: images };
}
