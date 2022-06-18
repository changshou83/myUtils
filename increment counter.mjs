/**
 *
 * @param {HTMLElement} elem
 */
export function incrementingCounter(elem) {
  elem.innerText = '0';
  const updateCounter = () => {
    const target = +elem.getAttribute('data-target');
    const curr = +elem.innerText;

    const increment = target / 200;

    if (curr < target) {
      elem.innerText = `${Math.ceil(curr + increment)}`;
      setTimeout(updateCounter, 1);
    } else {
      elem.innerText = target;
    }
  };
  updateCounter();
}
