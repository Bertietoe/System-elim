document.addEventListener('DOMContentLoaded', function () {
    const soldierCount = 12; // Total number of soldiers
    const heartRateGraphs = [];
    const radiationGraphs = [];
    const heartRates = Array.from({ length: soldierCount }, () => Math.floor(Math.random() * 21) + 60); // Initial heart rates (60-80 bpm)
    const radiationLevels = Array.from({ length: soldierCount }, () => Math.floor(Math.random() * 31) + 40); // Initial radiation levels (40-70 units)

    // Function to generate smooth graph data for a given value
    function generateGraphData(value) {
        return Array.from({ length: 60 }, (_, i) => value + Math.sin(i / 6) * 2); // Simulates a smooth wave pattern
    }

    // Initialize the graphs
    for (let i = 1; i <= soldierCount; i++) {
        const heartRateCtx = document.getElementById(`heartRateGraph${i}`).getContext('2d');
        const radiationCtx = document.getElementById(`radiationGraph${i}`).getContext('2d');

        // Initialize heart rate graph (red)
        heartRateGraphs.push(
            new Chart(heartRateCtx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: 60 }, (_, i) => i), // 60 time intervals
                    datasets: [{
                        label: 'Heart Rate (bpm)',
                        data: generateGraphData(heartRates[i - 1]),
                        borderColor: '#ff0000', // Red for heart rate
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { min: 50, max: 120 } }, // Reasonable bpm range
                },
            })
        );

        // Initialize radiation graph (green)
        radiationGraphs.push(
            new Chart(radiationCtx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: 60 }, (_, i) => i), // 60 time intervals
                    datasets: [{
                        label: 'Radiation Level',
                        data: generateGraphData(radiationLevels[i - 1]),
                        borderColor: '#00ff00', // Green for radiation
                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { min: 30, max: 100 } }, // Reasonable radiation range
                },
            })
        );
    }

    // Function to update the BPM and radiation levels every 2 seconds
    setInterval(() => {
        for (let i = 0; i < soldierCount; i++) {
            // Adjust BPM (heart rate) within realistic bounds
            heartRates[i] = Math.max(60, Math.min(100, heartRates[i] + Math.floor(Math.random() * 7) - 3)); // ±3 bpm variation
            // Adjust radiation level within realistic bounds
            radiationLevels[i] = Math.max(40, Math.min(70, radiationLevels[i] + Math.floor(Math.random() * 5) - 2)); // ±2 units variation

            // Update the displayed BPM and radiation level
            const heartRateElement = document.querySelector(`#soldier${i + 1} .heart-rate`);
            const radiationElement = document.querySelector(`#soldier${i + 1} .radiation-level`);

            // Update the displayed numbers
            if (heartRateElement) heartRateElement.textContent = heartRates[i];
            if (radiationElement) radiationElement.textContent = radiationLevels[i];

            // Update heart rate graph
            const heartRateChart = heartRateGraphs[i];
            heartRateChart.data.datasets[0].data = generateGraphData(heartRates[i]);
            heartRateChart.update();

            // Update radiation graph
            const radiationChart = radiationGraphs[i];
            radiationChart.data.datasets[0].data = generateGraphData(radiationLevels[i]);
            radiationChart.update();
        }
    }, 2000); // Update every 2 seconds
});
