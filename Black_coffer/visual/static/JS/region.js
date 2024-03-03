var region = 'api/region';

$.ajax({
    method: "GET",
    url: region,
    success: function(data) {
        const keys = [];
        const values = [];
        const colors = []; // Array to store random colors

        // Extract keys and values from data
        for (let key in data) {
            keys.push(key);
            values.push(data[key]);
        }

        // Generate random colors for each segment
        for (let i = 0; i < keys.length; i++) {
            const randomColor = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 0.6)';
            colors.push(randomColor);
        }

        // Create the chart after extracting data
        var ctx = document.getElementById('region_chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie', // Change chart type to 'pie'
            data: {
                labels: keys,
                datasets: [{
                    label: 'Data',
                    data: values,
                    backgroundColor: colors, // Set random colors
                    borderColor: 'white', // Border color
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right', // Position legend on the right side
                        labels: {
                            color: 'black' // Set font color to black
                        }
                    }
                },
                responsive: false, // Make the chart non-responsive
                maintainAspectRatio: false // Prevent the chart from maintaining aspect ratio
            }
        });
    }
});
