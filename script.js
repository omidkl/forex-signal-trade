let signalCount = 0;
const maxSignals = 10;
const signalList = document.getElementById('signal-list');
const signalCounter = document.getElementById('signalCount');
const priceElement = document.getElementById('price');
const requestSignalBtn = document.getElementById('requestSignal');

async function fetchPrice() {
  try {
    const response = await fetch('https://api.exchangerate.host/convert?from=XAU&to=USD');
    const data = await response.json();
    const price = data.result;
    if (price) {
      priceElement.textContent = '$' + price.toFixed(2);
      return price;
    } else {
      priceElement.textContent = 'Unavailable';
      return null;
    }
  } catch (err) {
    priceElement.textContent = 'Error';
    return null;
  }
}

function generateSignal(price) {
  if (signalCount >= maxSignals || !price) return;

  const direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
  const entry = price.toFixed(2);
  const tp = direction === 'BUY' ? (price + 5).toFixed(2) : (price - 5).toFixed(2);
  const sl = direction === 'BUY' ? (price - 3).toFixed(2) : (price + 3).toFixed(2);

  const card = document.createElement('div');
  card.className = 'signal-card';
  card.innerHTML = `<strong>${direction}</strong> at <strong>${entry}</strong><br/>TP: ${tp} | SL: ${sl}`;
  signalList.appendChild(card);

  signalCount++;
  signalCounter.textContent = signalCount;
}

requestSignalBtn.addEventListener('click', async () => {
  const price = await fetchPrice();
  generateSignal(price);
});

fetchPrice(); // Initial load
