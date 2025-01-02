document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const resultDiv = document.getElementById('conversion-result');

    async function fetchRates() {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        return response.json();
    }

    // Manual mapping of currency codes to country names
    const currencyToCountryMap = {
        USD: 'United States',
        EUR: 'Eurozone',
        GBP: 'United Kingdom',
        JPY: 'Japan',
        AUD: 'Australia',
        CAD: 'Canada',
        INR: 'India',
        CNY: 'China',
        MXN: 'Mexico',
        BRL: 'Brazil',
        // Add more currency-country mappings as needed
    };

    async function populateCurrencies() {
        const data = await fetchRates();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            // Get the country name from the map, fallback to currency code if no country name is found
            const countryName = currencyToCountryMap[currency] || currency;

            // Add options to the "from" currency dropdown
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = `${countryName} (${currency})`;
            fromCurrency.appendChild(optionFrom);

            // Add options to the "to" currency dropdown
            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = `${countryName} (${currency})`;
            toCurrency.appendChild(optionTo);
        });
    }

    convertBtn.addEventListener('click', async () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        const from = fromCurrency.value;
        const to = toCurrency.value;

        try {
            const rates = (await fetchRates()).rates;
            const result = (amount * rates[to] / rates[from]).toFixed(2);
            resultDiv.textContent = `${amount} ${from} = ${result} ${to}`;
        } catch {
            resultDiv.textContent = 'Conversion failed. Try again later.';
        }
    });

    populateCurrencies();
});
