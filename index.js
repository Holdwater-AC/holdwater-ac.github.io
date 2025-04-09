const load = (name, callback) => {
  const el = document.getElementById(name);
  const content =
    fetch(`${name}.html`)
      .then(response => response.text())
      .then(html => {
        el.innerHTML = html;
        if (callback && typeof callback === 'function') {
          callback();
        }
      })
      .catch(error => {
        console.error(`Error loading ${name}`, error);
      });

  el.innerHTML = content;
};

const stylePosition = () => {
  const el = document.getElementById('position');
  const int = parseFloat(el.textContent);
  const name = int < 0 ? 'red' : 'green';
  const i = int < 0 ? '-' : '+';
  
  el.classList.add(name);
  el.textContent = i + formatNumber(int) + '%';
};

const formatNumber = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

document.addEventListener('DOMContentLoaded', () => {
  load('micro');
  load('position', () =>{
    stylePosition();
  });
});
