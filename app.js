// Toggle Menu Bar and Navbar
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () => {
    if (searchBtn) searchBtn.classList.remove('fa-times');
    if (searchBar) searchBar.classList.remove('active');
    if (menu) menu.classList.remove('fa-times');
    if (navbar) navbar.classList.remove('active');
    if (loginForm) loginForm.classList.remove('active');
}

if (menu && navbar) {
    menu.addEventListener('click', () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });
}

if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', () => {
        searchBtn.classList.toggle('fa-times');
        searchBar.classList.toggle('active');
    });
}

if (formBtn && loginForm) {
    formBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
    });
}

if (formClose && loginForm) {
    formClose.addEventListener('click', () => {
        loginForm.classList.remove('active');
    });
}

if (videoBtn.length > 0) {
    videoBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let activeControl = document.querySelector('.controls .active');
            if (activeControl) activeControl.classList.remove('active');
            btn.classList.add('active');
            let src = btn.getAttribute('data-src');
            let videoSlider = document.querySelector('#video-slider');
            if (videoSlider) videoSlider.src = src;
        });
    });
}

// Swiper Sliders Initialization (Conditional)
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".review-slider") && typeof Swiper !== "undefined") {
        new Swiper(".review-slider", {
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    if (document.querySelector(".brand-slider") && typeof Swiper !== "undefined") {
        new Swiper(".brand-slider", {
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                450: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                991: { slidesPerView: 4 },
                1200: { slidesPerView: 5 },
            },
        });
    }

    // FAQ Accordion
    const faqBoxes = document.querySelectorAll('.faq .box');
    faqBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('active');
        });
    });

    // Booking Wizard Logic
    const bookingForm = document.getElementById('booking-wizard-form');
    if (bookingForm) {
        initBookingWizard();
    }
});

// Booking Wizard Implementation
function initBookingWizard() {
    const steps = document.querySelectorAll('.wizard-step');
    const progressLines = document.querySelectorAll('.progress-step');
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev');
    const seatGrid = document.querySelector('.seat-grid');
    const selectedSeatsText = document.getElementById('selected-seats-display');
    const totalPriceText = document.getElementById('total-price-display');
    
    let currentStep = 0;
    let selectedSeats = [];
    const SEAT_PRICE = 1500; // in LKR

    // Mock booked seats
    const bookedSeats = [5, 6, 12, 17, 24, 25, 32, 33];

    // Initialize Seat Grid
    if (seatGrid) {
        seatGrid.innerHTML = '';
        // 40 seats: 10 rows, 4 seats per row (2-space-2 layout)
        for (let i = 1; i <= 40; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            
            // Check if booked
            if (bookedSeats.includes(i)) {
                seat.classList.add('booked');
                seat.innerHTML = `<i class="fas fa-couch"></i><span class="seat-num">${i}</span>`;
            } else {
                seat.innerHTML = `<i class="fas fa-couch"></i><span class="seat-num">${i}</span>`;
                seat.addEventListener('click', () => toggleSeatSelection(seat, i));
            }
            
            seatGrid.appendChild(seat);
            
            // Add spacer representing aisle after every 2 seats in a row
            if (i % 4 === 2) {
                const aisle = document.createElement('div');
                aisle.classList.add('aisle-spacer');
                seatGrid.appendChild(aisle);
            }
        }
    }

    function toggleSeatSelection(seatElement, seatNum) {
        if (seatElement.classList.contains('selected')) {
            seatElement.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatNum);
        } else {
            seatElement.classList.add('selected');
            selectedSeats.push(seatNum);
        }
        updateSeatSummary();
    }

    function updateSeatSummary() {
        if (selectedSeats.length > 0) {
            selectedSeatsText.textContent = selectedSeats.sort((a,b)=>a-b).join(', ');
            totalPriceText.textContent = `LKR ${(selectedSeats.length * SEAT_PRICE).toLocaleString()}`;
        } else {
            selectedSeatsText.textContent = 'None';
            totalPriceText.textContent = 'LKR 0';
        }
    }

    // Step navigation
    btnNext.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    btnPrev.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentStep--;
            showStep(currentStep);
        });
    });

    function showStep(stepIdx) {
        steps.forEach((step, idx) => {
            if (idx === stepIdx) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update progress bar
        progressLines.forEach((pStep, idx) => {
            if (idx <= stepIdx) {
                pStep.classList.add('active');
            } else {
                pStep.classList.remove('active');
            }
        });

        // If it's the confirmation step, populate ticket details
        if (stepIdx === 3) {
            generateTicket();
        }
    }

    function validateStep(stepIdx) {
        if (stepIdx === 0) {
            const from = document.getElementById('from-location').value.trim();
            const to = document.getElementById('to-location').value.trim();
            const date = document.getElementById('departure-date').value;
            const busType = document.getElementById('bus-type').value;

            if (!from || !to || !date || !busType) {
                alert('Please fill in all route details.');
                return false;
            }
            if (from.toLowerCase() === to.toLowerCase()) {
                alert('Origin and destination cannot be the same.');
                return false;
            }
            return true;
        } else if (stepIdx === 1) {
            if (selectedSeats.length === 0) {
                alert('Please select at least one seat.');
                return false;
            }
            return true;
        } else if (stepIdx === 2) {
            const name = document.getElementById('passenger-name').value.trim();
            const email = document.getElementById('passenger-email').value.trim();
            const phone = document.getElementById('passenger-phone').value.trim();

            if (!name || !email || !phone) {
                alert('Please fill in all contact details.');
                return false;
            }
            // Basic email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return false;
            }
            return true;
        }
        return true;
    }

    function generateTicket() {
        // Read form values
        const fromVal = document.getElementById('from-location').value;
        const toVal = document.getElementById('to-location').value;
        const dateVal = document.getElementById('departure-date').value;
        const typeVal = document.getElementById('bus-type').value;
        const nameVal = document.getElementById('passenger-name').value;
        const emailVal = document.getElementById('passenger-email').value;
        const phoneVal = document.getElementById('passenger-phone').value;

        // Populate ticket details
        document.getElementById('ticket-passenger-name').textContent = nameVal;
        document.getElementById('ticket-route').textContent = `${fromVal} ➔ ${toVal}`;
        document.getElementById('ticket-date').textContent = dateVal;
        document.getElementById('ticket-bus-type').textContent = typeVal;
        document.getElementById('ticket-seats').textContent = selectedSeats.sort((a,b)=>a-b).join(', ');
        
        const total = selectedSeats.length * SEAT_PRICE;
        document.getElementById('ticket-amount').textContent = `LKR ${total.toLocaleString()}`;

        // Unique ticket code
        const ticketId = 'SBT-' + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('ticket-id').textContent = ticketId;
    }
}
