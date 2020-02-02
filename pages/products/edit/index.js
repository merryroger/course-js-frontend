import {ErrorNotification} from '../../../components/notification/index.js';
import createElement from "../../../lib/create-element.js";
import buildImageItem from "../../../lib/build-image-item.js";
import fetchJson from "../../../lib/fetch-json.js";
import buildForm from "../../../components/product-edit-form/form-builder.js";
import pickFormData from "../../../components/product-edit-form/form-data-picker.js";

export default class ProductEdition {

	async render() {
    this.url = new URL('/api/rest/products', location.href);
    this.url.searchParams.set('id', location.pathname.split("/").pop());

    this.ptrDown = this.pointerDown.bind(this);
    this.ptrMove = this.pointerMove.bind(this);
    this.ptrUp = this.pointerUp.bind(this);
    this.imgUpl = this.uploadImage.bind(this);
    this.submit = this.submitForm.bind(this);

    let product = await fetchJson(this.url);

		this.elem = createElement(`
      <div>
			  <h1><span class="blue__header">Products</span> / Edit Product</h1>
        <form id="product__form">
          ${await buildForm(product[0])}
          <div class="product__save__controls"><button type="button" name="save_data" class="product__save__button formatted__width">Save product</button></div>
        </form>
      </div>
		`);

    this.elem.querySelector(".product__save__button").onclick = this.submit;

    this.elem.addEventListener("pointerdown", this.ptrDown);

    this.elem.querySelector(".image__load__button").onclick = this.imgUpl;

    return this.elem;
	}

  pointerDown(event) {
    if(event.target.classList.contains("image__grab__area")) {
      event.target.style.cursor = "grab";

      return this.grabImageRow(event.target.closest(".image__item"), event.clientX, event.clientY);
    }

    if(event.target.classList.contains("image__item__remove")) {
      return this.deleteImage(event.target.closest(".image__item"));
    }
  }

  pointerMove(event) {
    if(this.dragImageRow) {
      this.draggedRow.style.top = event.clientY - this.shift.y + "px";
      this.draggedRow.style.left = event.clientX - this.shift.x + "px";
      this.checkIfScrollNeeded();
      this.checkIRowPosition();
    }
  }

  pointerUp(event) {
    if(this.dragImageRow) {
      window.removeEventListener("pointerup", this.ptrUp);
      window.removeEventListener("pointermove", this.ptrMove);

      return this.dropImageRow();
    }
  }

  grabImageRow(imageRow, cX, cY) {
    this.getImageRowSet(imageRow);

    imageRow.classList.add("dragged");
    let irRect = imageRow.getBoundingClientRect();
    this.draggedRow = createElement('<div class="dragged__image__row"></div>');
    this.draggedRow.innerHTML = imageRow.innerHTML;
    this.draggedRow.style.top = irRect.top + 2 + "px";
    this.draggedRow.style.left = irRect.left + 2 + "px";
    this.draggedRow.style.width = irRect.width + "px";
    this.shift = { x: cX - irRect.left - 2, y: cY - irRect.top - 2 };
    imageRow.innerHTML = '';

    document.body.append(this.draggedRow);
    window.addEventListener("pointermove", this.ptrMove);
    window.addEventListener("pointerup", this.ptrUp);

    this.imageRow = imageRow;
    this.dragImageRow = true;
  }

  dropImageRow() {
    this.imageRow.innerHTML = this.draggedRow.innerHTML;
    this.imageRow.classList.remove("dragged");
    this.imageRow.querySelector(".image__grab__area").style.cursor = "pointer";
    this.draggedRow.remove();
    this.iRows = null;
  }

  getImageRowSet(imageRow) {
    this.iRows = Array.from(this.elem.querySelectorAll("div.image__item.iitem"));
    this.iRectIndex = 0;
    
    for(let row of this.iRows) {
      if(imageRow == row)
        break;
      
      this.iRectIndex++;
    }
  }

  checkIfScrollNeeded() {
    let docRect = document.documentElement.getBoundingClientRect();
    let dragRect = this.draggedRow.getBoundingClientRect();
    let overTop = dragRect.top < 0;
    let overBottom = dragRect.bottom - document.documentElement.clientHeight > 0;
    
    if((!overTop && !overBottom) || (overTop && docRect.top == 0) || (overBottom && document.documentElement.clientHeight == docRect.bottom)) {
      return;
    }

    if(overTop) {
      window.scrollBy(0, dragRect.top);
    } else {
      window.scrollBy(0, dragRect.bottom - document.documentElement.clientHeight);
    }

  }

  checkIRowPosition() {
    let dY = this.draggedRow.offsetTop - this.imageRow.offsetTop + window.pageYOffset;

    if(this.draggedRow.offsetHeight - Math.abs(dY) < this.draggedRow.offsetHeight / 2) {
      if((this.iRectIndex == 0 && dY < 0) || (this.iRectIndex == this.iRows.length - 1 && dY > 0)) {
        return;
      }

      if(dY > 0) {
        this.iRectIndex++;
      } else {
        this.iRectIndex--;
      }

      this.imageRow.innerHTML = this.iRows[this.iRectIndex].innerHTML;
      this.imageRow.classList.remove("dragged");
      this.iRows[this.iRectIndex].innerHTML = "";
      this.imageRow = this.iRows[this.iRectIndex];
      this.imageRow.classList.add("dragged");
    }
  }

  deleteImage(imageRow) {
    this.getImageRowSet(imageRow);
    this.iRows.splice(this.iRectIndex, 1);
    let iContainer = this.elem.querySelector(".image__gallery__field");
    iContainer.innerHTML = "";
    iContainer.append(...this.iRows);
    this.iRows = null;
  }

  uploadImage() {
    let imageURL;
    let buttons = Array.from(this.elem.querySelectorAll("button"));

    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async () => {
      let file = fileInput.files[0];
      if(!file)
        return;

      let formData = new FormData();
      formData.append('image', file);

      buttons.map((button) => { button.style.cursor = "default"; button.disabled = true; } );

      try {
        let result = await fetchJson('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID: 28aaa2e823b03b1'
          },
          body: formData
        });

        imageURL = result.data.link;
      } catch(e) {
        new ErrorNotification('Upload error: ' + e.message);
        return;

      } finally {
        buttons.map((button) => { button.style.cursor = "pointer"; button.disabled = false; } );
      }

      //imageURL = "http://roger.ehwaz.ru/images/fort.jpg";

      this.elem.querySelector(".image__gallery__field").append(createElement(buildImageItem({ url: imageURL, source: file.name })));

      buttons.map((button) => { button.style.cursor = "pointer"; button.disabled = false; } );

    }

    fileInput.hidden = true;
    document.body.append(fileInput);
    fileInput.click();
  }

  async submitForm(event) {
    event.preventDefault();

    let url = new URL('/api/rest/products', location.href);
    let form = this.elem.querySelector("#product__form");
    let formData = await pickFormData(form);

    const params = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    let result = await fetchJson(url, params);

  }

}
