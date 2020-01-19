import createElement from "../../../lib/create-element.js";

export default class {

	async render() {
		this.elem = createElement(`
			<h1>Products / <span>Edit Product</span></h1>
		`);

		return this.elem;
	}

}

/*
export default class {
  async render() {
    this.elem = createElement(`<div>
      <h1 class="page-title">Page</h1>
      <p>No such page, sorry.</p>
    </div>
    `);

    return this.elem;
  }
}
*/
