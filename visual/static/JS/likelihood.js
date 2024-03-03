var likelihood = 'api/likelihood';

$.ajax({
    method: "GET",
    url: likelihood,
    success: function(data) {
        const keys = [];
        const values = [];

        // Extract keys and values from data
        for (let key in data) {
            keys.push(key);
            values.push(data[key]);
        }

        keys.reverse();
        values.reverse();

        // Create the chart after extracting data
        var ctx = document.getElementById('likelihood_chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line', // Change chart type to 'line'
            data: {
                labels: keys,
                datasets: [{
                    label: 'Data',
                    data: values,
                    // fill: true, // Fill the area under the line
                    // backgroundColor: 'rgba(165, 42, 42, 0.2)', // Brown shade
                    borderColor: 'brown', // Brown line color
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
