var intensity = 'api/intensity';

$.ajax({
    method: "GET",
    url: intensity,
    success: function(data) {
        const keys = [];
        const values = [];

        // Extract keys and values from data
        for (let key in data) {
            keys.push(key);
            values.push(data[key]);
        }

        // Create the chart after extracting data
        var ctx = document.getElementById('intensity_chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line', // Change chart type to 'line'
            data: {
                labels: keys,
                datasets: [{
                    label: 'Data',
                    data: values,
                    fill: true, // Fill the area under the line
                    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Red shade
                    borderColor: 'red', // Red line color
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'black' // Change y-axis label color to black
                        }
                    },
                    x: {
                        ticks: {
                            color: 'black' // Change x-axis label color to black
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black' // Change legend label color to black
                        }
                    }
                }
            }
        });
    }
});
