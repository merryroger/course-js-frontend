export default function buildHiddenField(params, value) {
  return `<input type="hidden" name="${params.key}" value="${value}" />`;
}
