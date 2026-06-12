# Sashi Bus Transportation Website

A premium, fully responsive, and highly interactive Bus Transportation agency website designed to provide passengers with a seamless online ticket booking experience. Built using HTML, CSS, JavaScript, and enhanced with modern web practices (like glassmorphism, responsive grids, and touch-ready swiper sliders).

---

## 🚀 Key Features

### 1. Interactive Multi-Step Booking Wizard (`book.html`)
- **Step 1: Route details** - Quick route parameters (Origin, Destination, Date, and Category) with support for auto-filling via URL query parameters.
- **Step 2: Interactive Seat Selection Map** - Dynamic 40-seat cabin grid representation. Click to select/deselect seats (occupied seats prefilled as booked), with live selection tracking and subtotal price calculation (LKR).
- **Step 3: Passenger Checkout** - Validation-enabled form collecting passenger details and baggage options.
- **Step 4: Digital Boarding Pass** - Generates a printable digital bus ticket featuring a unique ticket code, mock boarding QR code, detailed route, seat numbers, and total paid amount.

### 2. Upgraded Home Page Segment (`index.html`)
- **Express Search Overlay** - Search routes right from the hero segment.
- **Why Choose Us** - Feature section highlighting security, comfort, punctuality, and 24/7 service.
- **Express Route Showcase** - Cards presenting express routes (e.g. Colombo ➔ Kandy) with duration, price tag, and quick-booking triggers.
- **Testimonials Slider** - Horizontal reviews carousel powered by Swiper JS.
- **Partner Brands Slider** - Sleek grayscale logo carousel.
- **Interactive FAQ Accordion** - Modern slide-down question and answer boxes.

### 3. Fleet & Categories Showcase (`categories.html`)
- High-quality realistic renders representing **Luxury A/C Coaches**, **Non-A/C Semi-Luxury Buses**, and **Premium Rosa Minibuses**.
- Detailed specification lists detailing passenger capacity, climate controls, amenities (Wi-Fi, USB, Dual TV), and luggage capacity.

### 4. Interactive Services Segment (`services.html`)
- Modern hover-animated cards showcasing core features including Free High-Speed Wi-Fi, Reclining Ergonomic Seats, High-Fidelity Audio, Dual LED TV displays, and Professional Safety Drivers.

### 5. Contact & Support (`contact.html`)
- Structured support detail cards for Phone, Email, and GitHub repositories.
- Integrated **Passenger Feedback Form** with browser-side submission handlers.

### 6. Universal Authentication Modal
- Sleek glassmorphic passenger login modal accessible on every page via the header menu.

---

## 📂 Project Structure

```text
├── index.html          # Main homepage (FAQs, Reviews, Routes, Search)
├── book.html           # 4-Step Interactive Booking Wizard
├── categories.html     # Fleet specifications and class descriptions
├── services.html       # Amenity card showcases
├── contact.html        # Support details & feedback inquiry forms
├── style.css           # Global custom stylesheet (inc. glassmorphism & responsive layouts)
├── app.js              # JavaScript handlers (inc. Swiper, Wizard, Seat Map, and Accordions)
├── README.md           # Documentation
└── images/             # Media assets directory
    ├── book-img.jpg    # Booking wizard cockpit graphic
    ├── p-1.jpg         # Luxury Coach image
    ├── p-2.jpg         # Non A/C Bus image
    ├── p-3.jpg         # Rosa Minibus image
    ├── mobile.png      # Phone support icon
    ├── email.png       # Email support icon
    ├── github.png      # GitHub support icon
    └── vid-1.mp4 to 5  # Hero background video slots
```

---

## 🛠️ Local Development & Quick Start

Since this is a static frontend website, you can view the pages by launching a local web server (highly recommended for URL routing and video assets).

### Option A: Using Node.js (Recommended)
1. Install a lightweight server globally or run inline:
   ```bash
   npx serve
   ```
   *or*
   ```bash
   npx http-server
   ```
2. Open the URL provided (e.g., `http://localhost:3000` or `http://localhost:8080`) in your web browser.

### Option B: Using Python
If you have Python installed, you can start a server directly from the project directory:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`.

---

## 👤 Credits

- Created by **S.A.Sasindi Disanya**
- Cleaned and completed with premium interactive modules by **Antigravity AI**.
- Powered by [FontAwesome](https://fontawesome.com/) and [Swiper JS](https://swiperjs.com/).
