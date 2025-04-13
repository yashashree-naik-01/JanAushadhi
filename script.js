let medicines = [];

async function loadData() {
  try {
    const res = await fetch('data/medicine.json');
    medicines = await res.json();

    const datalist = document.getElementById('medicineList');
    medicines.forEach(med => {
      const option = document.createElement('option');
      option.value = med['Branded Name'];
      datalist.appendChild(option);
    });
  } catch (err) {
    console.error('Failed to load JSON:', err);
  }
}

function searchMedicines() {
  const input = document.getElementById('medicineSearch').value.toLowerCase().trim();
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '';

  if (!input) {
    container.innerHTML = '<p class="text-danger">Please enter a medicine name.</p>';
    return;
  }

  const results = medicines.filter(med =>
    med['Branded Name'].toLowerCase().includes(input) ||
    med['Generic Name'].toLowerCase().includes(input)
  );

  if (results.length === 0) {
    container.innerHTML = `<p>No results found for "${input}"</p>`;
    return;
  }

  results.forEach(med => {
    const card = document.createElement('div');
    card.className = 'medicine-card';
    card.innerHTML = `
      <h4>${med['Branded Name']}</h4>
      <p><strong>Generic:</strong> ${med['Generic Name']}</p>
      <p><strong>Jan Aushadhi Price:</strong> ₹${med['Jan Aushadhi Price'].trim()}</p>
      <p><strong>Branded Price:</strong> ₹${med['Branded Price'].trim()}</p>
      <p class="text-success"><strong>Savings:</strong> ${med['Savings (%)']}</p>
    `;
    container.appendChild(card);
  });
}

window.onload = loadData;
