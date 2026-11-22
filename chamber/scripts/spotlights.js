const spotlightsContainer = document.querySelector("#spotlights-container");
const membersURL = "data/members.json";

async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Unable to load members data.");
        }

        const members = await response.json();

        const qualifiedMembers = members.filter((member) =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        qualifiedMembers.sort(() => Math.random() - 0.5);

        const numberOfMembers = Math.floor(Math.random() * 2) + 2;

        const selectedMembers = qualifiedMembers.slice(0, numberOfMembers);

        displayMembers(selectedMembers);

    } catch (error) {
        console.error("Error loading members:", error);
        spotlightsContainer.textContent = "Unable to load business spotlights.";
    }
}

function displayMembers(members) {
    spotlightsContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} image`;

        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;

        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        const website = document.createElement("p");
        website.textContent = "Website: ";

        const websiteLink = document.createElement("a");
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = "_blank";
        websiteLink.rel = "noopener noreferrer";

        website.appendChild(websiteLink);

        const membership = document.createElement("p");

        if (member.membershipLevel === 3) {
            membership.textContent = "Membership: Gold";
        } else {
            membership.textContent = "Membership: Silver";
        }

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(website);
        card.appendChild(membership);

        spotlightsContainer.appendChild(card);
    });
}

getMembers();