export default {
  title: "Sales",
  display: "ra",
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
