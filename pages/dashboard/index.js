import createElement from "../../lib/create-element.js";
import RangePicker from "../../components/range-picker/index.js";
import ColumnChart from "../../components/column-chart/index.js";
import ProductsTable from "../../components/products-table/index.js";
import formatMoney from "../../lib/format-money.js";
import sumObjectValues from "../../lib/sum-object-values.js";

export default class DashboardPage {

  async render() {

    this.elem = createElement(`
      <div class="dashboard__container">
	      <div class="range__picker__row"><h1>Dashboard</h1></div>
        <div class="dashboard__charts"></div>
	      <div class="dashboard__table"></div>
      </div>
    `);

    this.rangePicker = this.buildRangePicker();

    this.charts = {
      orders: this.buildColumnChart('/api/dashboard/orders', this.rangePicker.getValue(), 'orders', 'Total orders', '/sales'),
      sales: this.buildColumnChart('/api/dashboard/sales', this.rangePicker.getValue(), 'sales', 'Total sales'),
      customers: this.buildColumnChart('/api/dashboard/customers', this.rangePicker.getValue(), 'customers', 'Total customers')
    }

    this.buildSortableTable(this.rangePicker.getValue());

    return this.elem;

  }

  buildRangePicker() {
    let defRange = {
      from: new Date(),
      to: new Date()
    }

    defRange.from.setMonth(defRange.from.getMonth() - 1);

    let rangePicker = new RangePicker(defRange);

    this.elem.querySelector('.range__picker__row').append(rangePicker.elem);

    return rangePicker;
  }

  buildColumnChart(url, range, name, title, link) {

  	let defChart = {
      url,
      range,
      height: 200,
      name,
      title,
      link,
      formatHeading: chartData => `$` + formatMoney(sumObjectValues(chartData)),
  	  formatTooltip: (date, value) => `<div><small>${date.toLocaleString('default', {dateStyle: 'medium'})}</small></div><strong>$${formatMoney(value)}</strong>`
    }

    let columnChart = new ColumnChart(defChart);

    this.elem.querySelector('.dashboard__charts').append(columnChart.elem);

    return columnChart;
  }

  buildSortableTable(range) {

    let inidata = {
      fieldsEnabled: ['images', 'title', 'category', 'quantity', 'price', 'sales'],
      order: {
        field: 'title',
        direction: 1
      },
      url: `/api/dashboard/bestsellers?from=${range.from.toISOString()}&to=${range.to.toISOString()}`,
      isDynamic: false,
      emptyPlaceholder: 'Empty dataset'
    };

    this.table = new ProductsTable(inidata);
    this.tableRebuild = this.rebuildTable.bind(this);

    this.elem.querySelector('.dashboard__table').append(this.table.elem);
    
    this.elem.addEventListener("date-select", this.tableRebuild);

  }

  rebuildTable(event) {
      let range = event.detail;
      this.table.setUrl(`/api/dashboard/bestsellers?from=${range.from.toISOString()}&to=${range.to.toISOString()}`);
      for(let chart of Object.values(this.charts)) {
        chart.setRange(range);
      }
  }

}

