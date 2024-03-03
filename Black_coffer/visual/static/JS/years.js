var start = 'api/start_years';
var end = 'api/end_years';

$.ajax({
    method: "GET",
    url: start,
    success: function(data) {
        const start_years = Object.values(data);

        $.ajax({
            method: "GET",
            url: end,
            success: function(data2) {
                const end_years = Object.values(data2);

                // Create a canvas element to render the chart
                var ctx = document.getElementById('years_chart').getContext('2d');

                // Define data for the chart
                var chartData = {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Start Years',
                        data: start_years,
                        borderColor: 'black', // Change to black
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Add a light black background color
                        fill: 'origin' // Fill the area under the start years line
                    }, {
                        label: 'End Years',
                        data: end_years,
                        borderColor: 'white', // Change to white
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add a light white background color
                        fill: 'origin' // Fill the area under the end years line
                    }]
                };

                // Define chart options
                var chartOptions = {
                    scales: {
                        y: {
                            ticks: {
                                color: 'black' // Font color set to black for y-axis ticks
                            }
                        },
                        x: {
                            ticks: {
                                color: 'black' // Font color set to black for x-axis ticks
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'black' // Label color set to black
                            }
                        }
                    }
                };

                // Create the chart
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: chartData,
                    options: chartOptions // Apply options to the chart
                });
            }
        });
    }
});
