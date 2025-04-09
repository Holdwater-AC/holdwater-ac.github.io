const loadPartial = (partialName) => {
  const contentDiv = document.getElementById(partialName);
  const partials = {
   'update':
      fetch(`${partialName}.html`)
        .then(response => response.text())
        .then(html => {
          contentDiv.innerHTML = html;
        })
        .catch(error => {
          console.error(`Error loading ${partialName}:`, error);
        })
  };

  contentDiv.innerHTML = partials[partialName];
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
