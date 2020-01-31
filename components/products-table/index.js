import SortableTable from "/components/sortable-table/index.js";

export default class ProductsTable extends SortableTable {
    renderTableRow(item) {
        let url = `/products/${item.id}`;
        return `<a href="${url}" class="sortable-table__row">${this.renderRowContent(item)}</a>`;
    }
};
