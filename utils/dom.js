/**
 * Trouve la position de l'élément par rapport au haut de la page de manière recursive
 *
 * @param {HTMLElement} element
 * @param {HTMLElement|null} parent
 */
export function offsetTop(element, parent = null) {
    let top = element.offsetTop;
    while ((element = element.offsetParent)) {
        if (parent === element) {
            return top;
        }
        top += element.offsetTop;
    }
    return top;
}

/**
 * Renvoie la hauteur de la fenêtre
 *
 * @return {number}
 */
export function windowHeight() {
    return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
}
