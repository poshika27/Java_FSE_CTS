let allEvents = [];
let filteredEvents = [];
let registrationCount = 0;
const sampleEvents = [
    {id: 1, name: "Summer Jazz Festival", date: "2024-07-15", category: "music", location: "Downtown Park", price: 25, seats: 150, registered: 45, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop", description: "Enjoy an evening of smooth jazz under the stars with local and touring musicians."},
    {id: 2, name: "Pottery Making Workshop", date: "2024-06-20", category: "workshop", location: "Community Arts Center", price: 35, seats: 20, registered: 8, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", description: "Learn the basics of pottery making with expert ceramicist Sarah Johnson."},
    {id: 3, name: "Community 5K Fun Run", date: "2024-06-10", category: "sports", location: "Riverside Trail", price: 15, seats: 200, registered: 125, image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop", description: "Join neighbors for a healthy morning run supporting local youth programs."},
    {id: 4, name: "International Food Festival", date: "2024-07-01", category: "food", location: "City Square", price: 20, seats: 300, registered: 178, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop", description: "Taste authentic cuisines from around the world made by local cultural groups."},
    {id: 5, name: "Digital Art Exhibition", date: "2024-06-25", category: "art", location: "Modern Gallery", price: 12, seats: 80, registered: 34, image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop", description: "Explore the intersection of technology and creativity in this immersive exhibition."},
    {id: 6, name: "Town Hall Meeting", date: "2024-06-15", category: "community", location: "City Hall Auditorium", price: 0, seats: 100, registered: 67, image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop", description: "Monthly community meeting to discuss local initiatives and upcoming projects."}
];
function Event(name, date, category, location, price, seats) {
    this.name = name;
    this.date = date;
    this.category = category;
    this.location = location;
    this.price = price;
    this.seats = seats;
    this.registered = 0;
}
Event.prototype.checkAvailability = function() {
    return this.seats - this.registered > 0;
};
Event.prototype.getAvailableSeats = function() {
    return this.seats - this.registered;
};
document.addEventListener('DOMContentLoaded', function() {
    allEvents = [...sampleEvents];
    filteredEvents = [...allEvents];
    displayEvents();
    loadUserPreferences();
    setupEventListeners();
});
function setupEventListeners() {
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration(e);
    }); 
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Thank you for your feedback! We'll get back to you soon.");
        this.reset();
    });
    window.addEventListener('beforeunload', function(e) {
        const form = document.getElementById('registrationForm');
        const formData = new FormData(form);
        let hasData = false;
        for (let [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                hasData = true;
                break;
            }
        }
        if (hasData) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return e.returnValue;
        }
    });
}
function displayEvents() {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';   
    if (filteredEvents.length === 0) {
        container.innerHTML = `<div class="col-12 text-center"><div class="alert alert-info"><i class="bi bi-info-circle me-2"></i>No events found matching your criteria.</div></div>`;
        return;
    }
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}
function createEventCard(event) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.innerHTML = `
        <div class="card eventCard h-100">
            <img src="${event.image}" class="card-img-top" alt="${event.name}" style="height: 250px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-primary">${event.category.toUpperCase()}</span>
                    <span class="text-muted"><i class="bi bi-calendar me-1"></i>${formatDate(event.date)}</span>
                </div>
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text text-secondary flex-grow-1">${event.description}</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span><i class="bi bi-geo-alt text-primary me-1"></i>${event.location}</span>
                        <span class="fw-bold ${event.price === 0 ? 'text-success' : 'text-primary'}">
                            ${event.price === 0 ? 'FREE' : '$' + event.price}
                        </span>
                    </div>
                    <button class="btn btn-custom w-100" onclick="registerForEvent(${event.id})">
                        <i class="bi bi-calendar-plus me-2"></i>Register Now
                    </button>
                </div>
            </div>
        </div>`;
    return col;
}
function formatDate(dateString) {
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    return new Date(dateString).toLocaleDateString('en-US', options);
}
function filterEvents() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    filteredEvents = allEvents.filter(event => {
        const matchesCategory = !categoryFilter || event.category === categoryFilter;
        const matchesSearch = !searchInput || 
            event.name.toLowerCase().includes(searchInput) ||
            event.description.toLowerCase().includes(searchInput) ||
            event.location.toLowerCase().includes(searchInput);
        return matchesCategory && matchesSearch;
    });
    displayEvents();
}
function handleSearch(event) {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        filterEvents();
    }, 300);
    
    if (event.key === 'Enter') {
        clearTimeout(window.searchTimeout);
        filterEvents();
    }
}
function registerForEvent(eventId) {
    const event = allEvents.find(e => e.id === eventId);
    if (event && event.checkAvailability()) {
        const form = document.getElementById('registrationForm');
        form.elements.eventType.value = event.category;
        form.elements.date.value = event.date;
        displayEventFee(form.elements.eventType);
        document.getElementById('registration').scrollIntoView({behavior: 'smooth'});
        form.elements.name.focus();
        alert(`You're registering for: ${event.name}\nDate: ${formatDate(event.date)}\nLocation: ${event.location}`);
    }
}
function handleRegistration(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registrationData = {};
    for (let [key, value] of formData.entries()) {
        registrationData[key] = value;
    }
    
    try {
        setTimeout(() => {
            registrationCount++;
            saveUserPreference(registrationData.eventType);
            const output = document.getElementById('confirmationOutput');
            const confirmationText = document.getElementById('confirmationText');
            confirmationText.textContent = `Registration successful! Welcome ${registrationData.name}. You're registered for the ${registrationData.eventType} event on ${registrationData.date}.`;
            output.style.display = 'block';
            event.target.reset();
            document.getElementById('eventFee').value = '0';
            document.getElementById('charCounter').textContent = '0 / 500 characters';
            simulateServerRequest(registrationData);
        }, 1000);
    } catch (error) {
        alert('Registration failed. Please try again.');
    }
}
async function simulateServerRequest(data) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Server responded with error');
    } catch (error) {
        return;
    }
}
function validatePhone(input) {
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    const errorDiv = document.getElementById('phoneError');
    if (input.value && !phoneRegex.test(input.value)) {
        input.classList.add('is-invalid');
        errorDiv.textContent = 'Please enter phone in format: (123) 456-7890';
    } else {
        input.classList.remove('is-invalid');
        errorDiv.textContent = '';
    }
}
function displayEventFee(select) {
    const selectedOption = select.options[select.selectedIndex];
    const fee = selectedOption.dataset.fee || '0';
    document.getElementById('eventFee').value = fee;
    if (select.value) saveUserPreference(select.value);
}
function countCharacters(textarea) {
    const maxLength = 500;
    const currentLength = textarea.value.length;
    const counter = document.getElementById('charCounter');
    counter.textContent = `${currentLength} / ${maxLength} characters`;
    if (currentLength > maxLength * 0.9) {
        counter.style.color = '#dc3545';
    } else if (currentLength > maxLength * 0.7) {
        counter.style.color = '#ffc107';
    } else {
        counter.style.color = '#6c757d';
    }
}
function countFeedback(textarea) {
    const maxLength = 300;
    const currentLength = textarea.value.length;
    const counter = document.getElementById('feedbackCounter');
    counter.textContent = `${currentLength} / ${maxLength} characters`;
}
function enlargeImage(img) {
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalTitle');
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = img.title || img.alt;
    modal.show();
}
function findNearbyEvents() {
    const locationDisplay = document.getElementById('locationDisplay');
    const locationText = document.getElementById('locationText');
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }
    
    const options = {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000};
    locationText.textContent = 'Getting your location...';
    locationDisplay.style.display = 'block';
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const {latitude, longitude} = position.coords;
            locationText.innerHTML = `<strong>Your location found!</strong><br>Latitude: ${latitude.toFixed(6)}<br>Longitude: ${longitude.toFixed(6)}<br><small>Showing events within 10 miles of your location.</small>`;
            setTimeout(() => {
                locationDisplay.style.display = 'none';
            }, 8000);
        },
        function(error) {
            let errorMessage = 'Unable to retrieve your location. ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Location access denied by user.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'An unknown error occurred.';
                    break;
            }
            locationText.textContent = errorMessage;
            locationDisplay.className = 'alert alert-warning mt-3';
            setTimeout(() => {
                locationDisplay.style.display = 'none';
                locationDisplay.className = 'alert alert-success mt-3';
            }, 5000);
        },
        options
    );
}
function saveUserPreference(eventType) {
    try {
        const preferences = {
            preferredEventType: eventType,
            lastSaved: new Date().toISOString()
        };
        window.userPreferences = preferences;
        displayUserPreference(eventType);
    } catch (error) {
        return;
    }
}
function loadUserPreferences() {
    try {
        const preferences = window.userPreferences;
        if (preferences && preferences.preferredEventType) {
            displayUserPreference(preferences.preferredEventType);
            const eventTypeSelect = document.querySelector('select[name="eventType"]');
            if (eventTypeSelect) {
                eventTypeSelect.value = preferences.preferredEventType;
                displayEventFee(eventTypeSelect);
            }
        }
    } catch (error) {
        return;
    }
}
function displayUserPreference(eventType) {
    const preferenceDiv = document.getElementById('userPreferences');
    const preferenceText = document.getElementById('preferenceText');
    preferenceText.textContent = `Welcome back! Your preferred event type is: ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`;
    preferenceDiv.style.display = 'block';
    setTimeout(() => {
        preferenceDiv.style.display = 'none';
    }, 8000);
}
function clearPreferences() {
    try {
        window.userPreferences = null;
        const form = document.getElementById('registrationForm');
        if (form) {
            form.reset();
            document.getElementById('eventFee').value = '0';
        }
        document.getElementById('userPreferences').style.display = 'none';
        alert('All preferences have been cleared!');
    } catch (error) {
        return;
    }
}
window.addEventListener('load', function() {
    alert('Welcome to CityConnect! Your community event portal is ready.');
});