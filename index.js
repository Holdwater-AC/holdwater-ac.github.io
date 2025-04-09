const loadTimestamp = () => {
  const el = document.getElementById('timestamp');
  const timestamp =
    fetch(`timestamp.html`)
      .then(response => response.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(error => {
        console.error(`Error loading`, error);
      });

  el.innerHTML = timestamp;
};

const loadUpdate = () => {
  const el = document.getElementById('update');
  const update =
    fetch(`update.html`)
      .then(response => response.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(error => {
        console.error(`Error loading`, error);
      });

  el.innerHTML = update;
  console.log(update);

  const num = parseFloat(update);
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
  loadUpdate();
});
