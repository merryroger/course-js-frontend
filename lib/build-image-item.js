export default function buildImageItem(image_data) {
    return `
    <div class="image__item iitem">
      <div class="image__item__content"><span class="image__grab__area">&nbsp;</span><img src="${image_data.url}" /><span class="image__source">${image_data.source}</span></div>
      <div class="image__item__remove"></div>
    </div>`;
}
