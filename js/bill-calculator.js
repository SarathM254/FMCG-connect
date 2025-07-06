// Bill Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const calculateBtn = document.querySelector('.calculate-btn');
    const totalAmount = document.querySelector('.total-amount');
    
    // Store prices for each row (matching the table data)
    const prices = [
        16400, 15200, 14800, 14200, 13800, 13400, 12800, 12400, 12000, 11600,
        11200, 10800, 10400, 10000, 9600, 9200, 8800, 8400, 8000, 7600,
        7200, 6800, 6400, 6000, 5600, 5200, 4800, 4400, 4100, 4100
    ];
    
    // Calculate total function
    function calculateTotal() {
        let total = 0;
        
        quantityInputs.forEach((input, index) => {
            const quantity = parseFloat(input.value) || 0;
            const price = prices[index];
            total += quantity * price;
        });
        
        // Format the total with commas and rupee symbol
        const formattedTotal = '₹' + total.toLocaleString('en-IN');
        totalAmount.textContent = formattedTotal;
    }
    
    // Add event listeners to quantity inputs for navigation only
    quantityInputs.forEach(input => {
        input.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Move to next input on Enter
                const currentIndex = Array.from(quantityInputs).indexOf(this);
                if (currentIndex < quantityInputs.length - 1) {
                    quantityInputs[currentIndex + 1].focus();
                }
            }
        });
    });
    
    // Add event listener to calculate button
    calculateBtn.addEventListener('click', calculateTotal);
    
    // Add event listener for Enter key on calculate button
    calculateBtn.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            calculateTotal();
        }
    });
    
    // Initialize with ₹0
    totalAmount.textContent = '₹0';
    
    // Add some helpful features
    quantityInputs.forEach(input => {
        // Allow only numbers and decimal points
        input.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                e.preventDefault();
            }
            // Allow only one decimal point
            if (charCode === 46 && this.value.indexOf('.') !== -1) {
                e.preventDefault();
            }
        });
        
        // Format input on blur (add .0 if no decimal)
        input.addEventListener('blur', function() {
            if (this.value && !this.value.includes('.')) {
                this.value = this.value + '.0';
            }
        });
    });
}); 