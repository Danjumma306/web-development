

// This wrapper ensures the script waits for the whole page to load
window.addEventListener('load', function() {
    
    const form = document.getElementById('whatsapp-form');

    // Safety check to make sure the script found your form
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // 1. Collect inputs
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value || "Not provided";
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const details = document.getElementById('details').value || "None";

            const phoneNumber = "233257217072"; 

            // 2. Format the message
            const message = `*New Booking Request*%0A%0A` +
                            `*Name:* ${name}%0A` +
                            `*Phone:* ${phone}%0A` +
                            `*Service:* ${service}%0A` +
                            `*Date:* ${date}%0A` +
                            `*Time:* ${time}%0A` +
                            `*Details:* ${details}`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

            // 3. Open WhatsApp (location.href is less likely to be blocked than window.open)
            window.location.href = whatsappUrl;
        });
    } else {
        console.error("Could not find the form with id 'whatsapp-form'. Check your HTML!");
    }
});