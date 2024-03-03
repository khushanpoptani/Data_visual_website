var relavance = 'api/relevance';

$.ajax({
    method: "GET",
    url: relavance,
    success: function(data) {
        const keys = [];
        const values = [];

        // Extract keys and values from data
        for (let key in data) {
            keys.push(key);
            values.push(data[key]);
        }

        // Create the chart after extracting data
        var ctx = document.getElementById('relavance_chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line', // Change chart type to 'line'
            data: {
                labels: keys,
                datasets: [{
                    label: 'Data',
                    data: values,
                    fill: false, // Disable fill
                    borderColor: 'rgba(255, 206, 86, 1)', // Line color (yellow shade)
                    backgroundColor: 'rgba(255, 206, 86, 0.6)', // Area fill color (yellow shade with transparency)
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'black' // Change y-axis label color
                        }
                    },
                    x: {
                        ticks: {
                            color: 'black' // Change x-axis label color
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black' // Change legend label color
                        }
                    }
                }
            }
        });
    }
});
