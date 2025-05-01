        let footerEnabled = false; // Set to false to hide the footer countdown

        let announcements = [
    { text: "✅ Free Delivery For Order Over $10 🛍️", class: "restock", active: true },
    { text: "🛠️ Scheduled Maintenance: Our site will be temporarily down.", class: "maintenance", active: false },
    { text: "🚨 Store Closure Alert: We’ll be closed this weekend!", class: "store-close", active: true }
];

function updateAnnouncementStyle() {
    let activeAnnouncements = announcements.filter(a => a.active);
    if (activeAnnouncements.length === 0) return;

    let announcementDiv = document.getElementById("announcement");
    document.getElementById("announcementText").innerText = activeAnnouncements[0].text;

    if (activeAnnouncements[0].class === "restock") {
        announcementDiv.style.cssText = `
            background-color: #ff9900; /* Orange */
            color: #fff;
            padding: 8px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
            text-transform: uppercase;
            box-shadow: 0px 0px 10px rgba(255, 165, 0, 0.6);
        `;
    } else if (activeAnnouncements[0].class === "maintenance") {
        announcementDiv.style.cssText = `
            background-color: #0066ff; /* Blue */
            color: #fff;
            padding: 8px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
            font-style: italic;
            box-shadow: 0px 0px 10px rgba(0, 102, 255, 0.6);
        `;
    } else if (activeAnnouncements[0].class === "store-close") {
        announcementDiv.style.cssText = `
            background-color: #cc0000; /* Red */
            color: #fff;
            padding: 8px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
            text-decoration: underline;
            box-shadow: 0px 0px 10px rgba(204, 0, 0, 0.6);
        `;
    }
}

// Run the function when the page loads
updateAnnouncementStyle();

        let index = 0;
        let restockDeadline = new Date("2025-05-10T12:00:00");

        function updateAnnouncementText() {
            let activeAnnouncements = announcements.filter(a => a.active);
            if (activeAnnouncements.length === 0) return;

            let announcementDiv = document.getElementById("announcement");
            document.getElementById("announcementText").innerText = activeAnnouncements[index].text;
            announcementDiv.className = "announcement " + activeAnnouncements[index].class;
            announcementDiv.style.display = "block";

            index = (index + 1) % activeAnnouncements.length;
        }

        function updateCountdown() {
            if (!footerEnabled) {
                document.getElementById("footerCountdown").style.display = "none";
                return;
            }

            let now = new Date();
            let timeRemaining = restockDeadline - now;

            if (timeRemaining > 0) {
                document.getElementById("days").innerText = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                document.getElementById("hours").innerText = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                document.getElementById("minutes").innerText = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                document.getElementById("seconds").innerText = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            } else {
                document.getElementById("footerCountdown").innerHTML = "✅ Product Restocked!";
            }

            document.getElementById("footerCountdown").style.display = "block";
        }

        setInterval(updateAnnouncementText, 5000); // Change announcement every 5 seconds
        if (footerEnabled) setInterval(updateCountdown, 1000); // Updates countdown every second

        updateAnnouncementText(); // Initialize first announcement
        updateCountdown(); // Initialize countdown
