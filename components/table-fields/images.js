export default {
  title: "Image",
  render(src) {
    return `<img src="${src.images[0].url}" height="20" />`;
  },
  getContent(value) {
    return null;
  },
  compare: null
}
