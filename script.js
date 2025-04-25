let signalCount = 0;
const maxSignals = 10;
const signalList = document.getElementById('signal-list');
const signalCounter = document.getElementById('signalCount');
const priceElement = document.getElementById('price');
const requestSignalBtn = document.getElementById('requestSignal');

async function fetchPrice() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=XAU&symbols=USD');
    const data = await res.json();
    const price = data.rates?.USD?.toFixed(2);
    if (price) priceElement.textContent = `$${price}`;
    return parseFloat(price);
  } catch (error) {
    priceElement.textContent = 'Error loading price';
    return null;
  }
}

function generateSignal(price) {
  if (signalCount >= maxSignals) return;
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
  if (price) generateSignal(price);
});

// Initialize price on load
fetchPrice();