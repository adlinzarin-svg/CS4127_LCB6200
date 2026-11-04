
// Mobile navigation menu
const menuButton = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector(".nav-links");

// Open and close the navigation menu
menuButton.addEventListener("click", function () {

    navigationLinks.classList.toggle("active");

    // Update accessibility information
    const isOpen = navigationLinks.classList.contains("active");

    menuButton.setAttribute("aria-expanded", isOpen);

});




// Trip planner
const tripForm = document.querySelector("#tripForm");

if (tripForm) {

    tripForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const days = Number(document.querySelector("#days").value);
        const pace = document.querySelector("#pace").value;

        const interests = document.querySelectorAll(
            'input[name="interest"]:checked'
        );

        const selectedInterests = [];

        interests.forEach(function (interest) {
            selectedInterests.push(interest.value);
        });

        const result = document.querySelector("#itineraryResult");

        if (selectedInterests.length === 0) {
            result.innerHTML = "<p>Please select at least one interest.</p>";
            return;
        }

        const destinations = {
            nature: [
                "Explore Ulu Temburong National Park",
                "Discover Brunei's rainforest and rivers",
                "Enjoy a peaceful nature experience"
            ],

            culture: [
                "Visit Omar Ali Saifuddien Mosque",
                "Explore Kampong Ayer",
                "Discover Brunei's museums and heritage"
            ],

            food: [
                "Try traditional ambuyat",
                "Taste local nasi katok",
                "Explore Brunei's local food scene"
            ],

            adventure: [
                "Experience a rainforest adventure",
                "Explore Brunei's waterways",
                "Discover outdoor activities in Brunei"
            ]
        };

        let itineraryHTML = "<h2>Your Suggested Itinerary</h2>";

        for (let day = 1; day <= days; day++) {

            const interest = selectedInterests[
                (day - 1) % selectedInterests.length
            ];

            const activities = destinations[interest];

            let activity;

            if (pace === "relaxed") {
                activity = activities[2];
            } else if (pace === "active") {
                activity = activities[0];
            } else {
                activity = activities[(day - 1) % activities.length];
            }

            itineraryHTML += `
                <div class="itinerary-day">
                    <h3>Day ${day}</h3>
                    <p>${activity}</p>
                </div>
            `;
        }

        result.innerHTML = itineraryHTML;

    });

}




// Contact form
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.querySelector("#contactName").value.trim();
        const email = document.querySelector("#contactEmail").value.trim();
        const message = document.querySelector("#contactMessage").value.trim();
        const contactStatus = document.querySelector("#contactStatus");

        if (!name || !email || !message) {
            contactStatus.textContent = "Please complete all fields.";
            return;
        }

        contactStatus.textContent =
            "Thank you, " + name + "! Your enquiry has been recorded.";

        contactForm.reset();
    });
}
