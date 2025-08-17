// Small DOM helpers with type safety
export function elById(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element #${id} not found`);
    return el;
}
export function create(tag, className) {
    const el = document.createElement(tag);
    if (className)
        el.className = className;
    return el;
}
