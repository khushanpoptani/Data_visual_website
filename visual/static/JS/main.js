// JavaScript file: script.js

// Function to populate dropdown menus from API data
function populateDropdown(url, dropdownId) {
    $.ajax({
        method: "GET",
        url: url,
        success: function(data) {
            const keys = ['All'];

            // Extract keys from data
            for (let key in data) {
                keys.push(key);
            }
            const topics = keys;

            // Get dropdown menu element
            const dropdown = document.getElementById(dropdownId);

            // Loop through topics array and insert options into the dropdown menu
            topics.forEach(topic => {
                const option = document.createElement('option');
                option.value = topic;
                option.textContent = topic;
                dropdown.appendChild(option);
            });
        }
    });
}

// Populate dropdown menus
populateDropdown('api/topic', 'Topic');
populateDropdown('api/sector', 'sector');
populateDropdown('api/region', 'region');
populateDropdown('api/pestle', 'pestle');
populateDropdown('api/country', 'country');

// Function to handle filter button and form elements
function setupFilterFunctionality() {
    // Get filter button and form elements
    const filterBtn = document.getElementById('filterBtn');
    const filterForm = document.getElementById('filterForm');
    const endYearInput = document.getElementById('endYear');
    const selectedEndYear = document.getElementById('selectedEndYear');
    const applyBtn = document.getElementById('applyBtn');

    // Add click event listener to filter button
    filterBtn.addEventListener('click', function () {
        // Toggle visibility of form
        if (filterForm.style.display === 'none') {
            filterForm.style.display = 'block';
        } else {
            filterForm.style.display = 'none';
        }
    });

    // Add input event listener to end year range slider
    endYearInput.addEventListener('input', function () {
        selectedEndYear.textContent = `${endYearInput.value}`;
    });

    // Add click event listener to apply button
    applyBtn.addEventListener('click', function () {
        // Add functionality to apply button here
        // For example, you can submit the form or perform some action
        console.log("Apply button clicked");
    });
}

// Call the setup function for filter functionality
setupFilterFunctionality();
