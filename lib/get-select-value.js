export default function getSelectValue(form, _key) {
    return { [_key]: form[_key].options[form[_key].selectedIndex].getAttribute("key") };
}
