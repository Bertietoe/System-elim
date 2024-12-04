document.addEventListener('DOMContentLoaded', function () {
    const soldierCount = 12; // Number of soldiers
    const heartRateGraphs = [];
    const radiationGraphs = [];
    const heartRates = Array.from({ length: soldierCount }, () => Math.floor(Math.random() * 21) + 60); // Random initial heart rates between 60-80
    const radiationLevels = Array.from({ length: soldierCount }, () => Math.floor(Math.random() * 31) + 40); // Random radiation between 40-70

    // Function to generate graph data
    function generateGraphData(value) {
        const data = [];
        for (let i = 0; i < 60; i++) {
            data.push(value + Math.sin(i / 6) * 2); // Simulate wave
        }
        return data;
    }

    // Initialize the graphs
    for (let i = 1; i <= soldierCount; i++) {
        const heartRateCtx = document.getElementById(`heartRateGraph${i}`).getContext('2d');
        const radiationCtx = document.getElementById(`radiationGraph${i}`).getContext('2d');

        // Heart rate graph (red)
        heartRateGraphs.push(
            new Chart(heartRateCtx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: 60 }, (_, i) => i),
                    datasets: [{
                        label: 'Heart Rate (bpm)',
                        data: generateGraphData(heartRates[i - 1]),
                        borderColor: '#ff0000', // Red for heart rate
                        backgroundColor: 'rgba(255, 0, 0, 0.2)', // Light red fill
                        fill: true,
                    }]
                },
                options: { responsive: true, scales: { y: { min: 50, max: 120 } } }
            })
        );

        // Radiation graph (green)
        radiationGraphs.push(
            new Chart(radiationCtx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: 60 }, (_, i) => i),
                    datasets: [{
                        label: 'Radiation Level',
                        data: generateGraphData(radiationLevels[i - 1]),
                        borderColor: '#00ff00', // Green for radiation
                        backgroundColor: 'rgba(0, 255, 0, 0.2)', // Light green fill
                        fill: true,
                    }]
                },
                options: { responsive: true, scales: { y: { min: 30, max: 100 } } }
            })
        );
    }

    // Update function
    setInterval(() => {
        for (let i = 0; i < soldierCount; i++) {
            // Randomize heart rate and radiation level
            heartRates[i] = Math.max(60, Math.min(100, heartRates[i] + Math.floor(Math.random() * 7) - 3));
            radiationLevels[i] = Math.max(40, Math.min(70, radiationLevels[i] + Math.floor(Math.random() * 5) - 2));

            // Update text
            document.querySelector(`#soldier${i + 1} .heart-rate`).textContent = heartRates[i];
            document.querySelector(`#soldier${i + 1} .radiation-level`).textContent = radiationLevels[i];

            // Update graph data
            heartRateGraphs[i].data.datasets[0].data = generateGraphData(heartRates[i]);
            heartRateGraphs[i].update();
            radiationGraphs[i].data.datasets[0].data = generateGraphData(radiationLevels[i]);
            radiationGraphs[i].update();
        }
    }, 2000); // Update every 2 seconds
});
