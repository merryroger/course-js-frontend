import createElement from "../../../lib/create-element.js";

export default class Products {
  
  async render() {
    this.elem = createElement(`
    	<div class="dashboard__container">
	        <div><h1>Products</h1></div>
            
      	</div>
    `);

    return this.elem;
  }

}
