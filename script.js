let medicines = [];
let stores = [];

async function loadData() {
  try {
    const meds = await fetch('data/medicines.json');
    medicines = await meds.json();

    const datalist = document.getElementById('medicineList');
    medicines.forEach(med => {
      const option = document.createElement('option');
      option.value = med.name;
      datalist.appendChild(option);
    });

    const storeRes = await fetch('data/stores.json');
    stores = await storeRes.json();
    displayStores();
  } catch (err) {
    console.error('Failed to load JSON:', err);
  }
}

function searchMedicines() {
  const input = document.getElementById('medicineSearch').value.toLowerCase();
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  if (!input) {
    container.innerHTML = '<p class="text-danger">Please enter a medicine name.</p>';
    return;
  }

  const results = medicines.filter(med =>
    med.name.toLowerCase().includes(input) ||
    med.genericName.toLowerCase().includes(input)
  );

  if (results.length === 0) {
    container.innerHTML = `<p>No results found for "${input}"</p>`;
    return;
  }

  results.forEach(med => {
    const card = document.createElement('div');
    card.className = 'medicine-card';
    card.innerHTML = `
      <h4>${med.name}</h4>
      <p><strong>Generic:</strong> ${med.genericName}</p>
      <p><strong>Jan Aushadhi Price:</strong> ₹${med.janAushadhiPrice}</p>
      <p><strong>Branded Price:</strong> ₹${med.brandedPrice}</p>
      <p class="text-success"><strong>Savings:</strong> ${med.savings}%</p>
    `;
    container.appendChild(card);
  });
}

function displayStores() {
  const container = document.getElementById('storesContainer');
  stores.slice(0, 3).forEach(store => {
    const card = document.createElement('div');
    card.className = 'store-card';
    card.innerHTML = `
      <h5>${store.name}</h5>
      <p>${store.address}</p>
      <p>${store.city}, ${store.district}</p>
      <p><strong>Phone:</strong> ${store.phone}</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();

  const toggle = document.getElementById('darkModeToggle');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  });
});
