const load = (name) => {
  const el = document.getElementById(name);
  const content =
    fetch(`${name}.html`)
      .then(response => response.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(error => {
        console.error(`Error loading ${name}`, error);
      });

  el.innerHTML = content;
};

const styleUpdate = () => {
  const el = document.getElementById('update');
  console.log(el.textContent);

  const num = parseFloat(el.textContent);
  const name = num < 0 ? 'red' : 'green';
  const indicator = num < 0 ? '-' : '+';
  
  el.classList.add(name);
  el.textContent = indicator + formatNumber(num) + '%';
};

const formatNumber = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

document.addEventListener('DOMContentLoaded', () => {
  load('update');
  load('timestamp');
  styleUpdate();
});
