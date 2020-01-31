export default {
  title: "Sales",
  render(value) {
    return value.discount;
  },
  getContent(value) {
    return +value.innerHTML;
  },
  compare(value1, value2) {
    return value1 - value2;
  }
}
