const loadPartial = (partialName) => {
  const el = document.getElementById(partialName);
  const partials = {
   'update':
      fetch(`${partialName}.html`)
        .then(response => response.text())
        .then(html => {
          el.innerHTML = html;
        })
        .catch(error => {
          console.error(`Error loading ${partialName}:`, error);
        })
  };

  el.innerHTML = partials[partialName];

  const element = document.getElementById('change');
  if (element) {
    const num = parseFloat(element.textContent);
    const className = num < 0 ? 'red' : 'green';
    const indicator = num < 0 ? '-' : '+';
    
    element.classList.add(className);
    element.textContent = indicator + formatNumber(num) + '%';
  }
};

const formatNumber = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadPartial('update');
});
