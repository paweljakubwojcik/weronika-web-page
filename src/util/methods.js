


/**
 * scrolls with smooth behaviour
 * @param {String} elementID ex. '#Identificator'
 * @returns {DOMElement} found element to wchich scroll is performed
 */
export const scrollTo = (elementID) => {

    const element = document?.body?.querySelector(elementID)
    element && element.scrollIntoView({
        behavior: 'smooth'
    })

    return element
}
