export default function getInputValue(form, key) {
    return { [key]: form[key].value };
}
