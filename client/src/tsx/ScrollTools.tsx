const isElementMiddleView = (element: Element) => {
    const rect = element.getBoundingClientRect();
    const elementMiddle = rect.top + rect.height / 2;
    const viewportMiddle = window.innerHeight / 2;

    return elementMiddle <= viewportMiddle;
}

const freezeElement = (element: HTMLElement) => {
    let rect = element.getBoundingClientRect();
    let freezeHeight = 0;

    window.addEventListener('scroll', () => {
        rect = element.getBoundingClientRect();
        let isFixed = element.classList.contains('fixed');

        if (!isFixed && isElementMiddleView(element)) {
            freezeHeight = rect.top + rect.height / 2 + scrollY;
        }

        if (!freezeHeight) {
            return;
        }

        if (window.scrollY + window.innerHeight / 2 >= freezeHeight) {
            element.classList.add('fixed');
        }
        else if (window.scrollY + window.innerHeight / 2 < freezeHeight) {
            element.classList.remove('fixed');
        }
    }) 

};

export default freezeElement;