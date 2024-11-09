
// JavaScript to toggle mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});



fetchCryptoPrices();

setInterval(fetchCryptoPrices, 60000);
const ctx = document.getElementById('cryptoPriceChart').getContext('2d');


const data = {
  labels: [], 
  datasets: [
    {
      label: 'Bitcoin',
      data: [], 
      borderColor: 'rgba(255, 206, 86, 1)',
      fill: false,
      tension: 0.1,
    },
    {
      label: 'Ethereum',
      data: [], 
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false,
      tension: 0.1,
    },
    {
      label: 'Ripple',
      data: [], 
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
      tension: 0.1,
    },
  ]
};

const cryptoChart = new Chart(ctx, {
  type: 'line', 
  data: data,
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
        beginAtZero: false,
      },
    },
  }
});


async function updateChart() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd');
    const prices = await response.json();

  
    const now = new Date().toLocaleTimeString();

    data.labels.push(now);
    data.datasets[0].data.push(prices.bitcoin.usd);   
    data.datasets[1].data.push(prices.ethereum.usd);  
    data.datasets[2].data.push(prices.ripple.usd);    

    
    if (data.labels.length > 10) {
      data.labels.shift();         
      data.datasets.forEach(dataset => dataset.data.shift()); 
    }

    
    cryptoChart.update();
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
  }
}


// Update chart every 60 seconds
setInterval(updateChart, 60000);
updateChart(); // Immediately call it once to initialize

// Array of possible messages to display in the popup
const messages = [
  "Daniel has just withdrawn $300",
  "Moses has just invested $500",
  "Sarah has just withdrawn $150",
  "Lola has just invested $200",
  "Michael has just earned $100 from his investment",
  "A client has just withdrawn $450",
  "Mary has just invested $700",
  "Keane has just invested $700",
  "Michael has just earned $100 from his investment"
];

// Function to show the popup with a given message
function showPopup(message) {
  const popup = document.getElementById('popup-notification');
  const popupMessage = document.getElementById('popup-message');

  // Set the message content
  popupMessage.textContent = message;

  // Show the popup (remove 'hidden' class and add 'show' class)
  popup.classList.remove('hidden');
  popup.classList.add('show');

  // Hide the popup after 5 seconds
  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hidden');
  }, 5000); // 5 seconds
}

// Function to trigger a random popup message
function triggerRandomPopup() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMessage = messages[randomIndex];
  showPopup(randomMessage);
}

// Trigger a random popup every 7 seconds
setInterval(triggerRandomPopup, 7000);

// Function to update the chart (dummy function, replace with actual chart update logic)
function updateChart() {
  console.log("Chart updated"); // Placeholder for your chart update logic
}


  