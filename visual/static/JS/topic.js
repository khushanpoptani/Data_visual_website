var topic = 'api/topic';

$.ajax({
    method: "GET",
    url: topic,
    success: function(data) {
        const keys = [];
        const values = [];

        // Extract keys and values from data
        for (let key in data) {
            keys.push(key);
            values.push(data[key]);
        }

        // Create the chart after extracting data
        var ctx = document.getElementById('topic_chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line', // Change chart type to 'line'
            data: {
                labels: keys,
                datasets: [{
                    label: 'Data',
                    data: values,
                    fill: true, // Fill the area under the line
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Light black shade
                    borderColor: 'black', // Change line color to black
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
