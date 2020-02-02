import * as tableFields from "../../../components/table-fields/index.js";
import createElement from "../../../lib/create-element.js";

export default class SortableTable {

	constructor({ fieldsEnabled, order, url, isDynamic, emptyPlaceholder }) {
		this.fieldsEnabled = fieldsEnabled;
		this.order = order;
		this.url = new URL(url, location.href);
		this.isDynamic = isDynamic;
		this.emptyPlaceholder = emptyPlaceholder;

		this.headerClick = this.tableHeaderClick.bind(this);

		this.render();
	}

	async render() {
		this.elem = createElement(`
				<div class="sortable__table">
					<div data-elem="header" class="sortable-table__header">
    			    ${this.renderHeaders()}
      				</div>
				</div>
			`);

		this.elem.querySelector(".sortable-table__header").addEventListener("pointerdown", this.headerClick);

		let data = await this.loadData();

		return this.elem;
	}

	async setUrl(url) {
		this.url = new URL(url, location.href);
		try {
      	  let result = await fetch(this.url);
          let data = await result.json();
          await this.rebuildTableBody(data);
      } catch(e) {
      	  new Notification(e.message);
      }	
	}

	async loadData() {
      try {
        let result = await fetch(this.url);
        let data = await result.json();
        await this.renderTableBody(data);
      } catch(e) {
        new Notification(e.message);
      }
	}

	renderHeaders() {
		let headers = [];
		let order = "";

		for(let field of this.fieldsEnabled) {
			if(field === this.order.field) {
				order = (this.order.direction == 1) ? "&nbsp;▼" : "&nbsp;▲";
			} else {
				order = "";
			}

			headers[headers.length] = `<div class="sortable-table__cell" data-name="${field}"><span>${tableFields[field].title}${order}</span></div>`;
		}

		return headers.join('');
	}

	rebuildTableBody(data) {
		let tBody = this.elem.querySelector("tbody");

		tBody.innerHTML = "";
		tBody.innerHTML = this.renderTableRows(data);

		this.sortContent(tBody, this.order.field);
	}

	renderTableBody(data) {
		let tBody = document.createElement("tbody");
		tBody.className = "sortable-table__body";

		tBody.innerHTML = this.renderTableRows(data);

		this.elem.append(tBody);

		this.sortContent(tBody, this.order.field);
	}

	renderTableRows(data) {
		let rows = "";

		for(let item of data) {
			rows += this.renderTableRow(item);
		}

		return rows;
	}

	renderTableRow(item) {
		return `<div class="sortable-table__row">${this.renderRowContent(item)}</div>`;
	}

	renderRowContent(item) {
		let row = [];
		for(let field of this.fieldsEnabled) {
			let display = (tableFields[field].display !== undefined) ? ` ${tableFields[field].display}` : "";
			row[row.length] = `<div class="sortable-table__cell${display}" data-name="${field}">${tableFields[field].render(item)}</div>`;
		}

		return row.join('');
	}

	tableHeaderClick(event) {
		if(event.target.closest(".sortable-table__cell") == null)
			return;

		let field = event.target.closest(".sortable-table__cell").dataset.name;

		if(tableFields[field].compare == null)
			return;

		if(this.order.field == field) {
			this.order.direction = !this.order.direction;
		} else {
			this.order.field = field;
			this.order.direction = 1;
		}

		let tBody = this.elem.querySelector("tbody");
   		this.sortContent(tBody, field);

		this.elem.querySelector(".sortable-table__header").innerHTML = this.renderHeaders();
	}

	sortContent(tBody, field) {
		let getContent = tableFields[field].getContent;
		let compare = tableFields[field].compare;

    	let rows = Array.from(tBody.querySelectorAll(".sortable-table__row"));

    	rows = (!this.order.direction) ? 
      	rows.sort((rowA, rowB) => compare(getContent(rowA.querySelector(`[data-name=${field}]`)), getContent(rowB.querySelector(`[data-name=${field}]`)))) : 
      	rows.sort((rowA, rowB) => compare(getContent(rowB.querySelector(`[data-name=${field}]`)), getContent(rowA.querySelector(`[data-name=${field}]`))));
    
    	tBody.append(...rows);
	}

}
