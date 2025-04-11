// Sample medicine data - in real app this would come from API or data/medicines.json
const medicines = [
    {
        name: "Paracetamol",
        genericName: "Acetaminophen",
        janAushadhiPrice: 5.00,
        brandedPrice: 25.00,
        savings: 80,
        stores: ["Delhi-01", "Mumbai-02"]
    },
    // More medicine entries...
];

function searchMedicines() {
    const searchTerm = document.getElementById('medicineSearch').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (!searchTerm) {
        resultsContainer.innerHTML = `<p class="text-danger">Please enter a medicine name</p>`;
        return;
    }

    const results = medicines.filter(med => 
        med.name.toLowerCase().includes(searchTerm) || 
        med.genericName.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
        return;
    }

    let html = `<div class="row">`;
    results.forEach(med => {
        html += `
        <div class="col-md-6">
            <div class="medicine-card">
                <h3>${med.name}</h3>
                <p><strong>Generic Name:</strong> ${med.genericName}</p>
                <p><strong>Jan Aushadhi Price:</strong> ₹${med.janAushadhiPrice.toFixed(2)}</p>
                <p><strong>Branded Price:</strong> ₹${med.brandedPrice.toFixed(2)}</p>
                <p class="text-success"><strong>Savings:</strong> ${med.savings}%</p>
            </div>
        </div>`;
    });
    html += `</div>`;
    
    resultsContainer.innerHTML = html;
}

// Load store data from data/stores.json
async function loadStores() {
    try {
        const response = await fetch('data/stores.json');
        const stores = await response.json();
        displayStores(stores);
    } catch (error) {
        console.error("Error loading stores:", error);
    }
}

function displayStores(stores) {
    const container = document.getElementById('storesContainer');
    let html = `<div class="row">`;
    
    stores.slice(0, 3).forEach(store => {
        html += `
        <div class="col-md-4">
            <div class="store-card">
                <h4>${store.name}</h4>
                <p>${store.address}</p>
                <p>${store.city}, ${store.district}</p>
                <p><strong>Contact:</strong> ${store.phone}</p>
            </div>
        </div>`;
    });
    html += `</div>`;
    
    container.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStores();
});