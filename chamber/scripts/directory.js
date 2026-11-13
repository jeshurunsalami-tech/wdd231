const membersContainer = document.querySelector("#members-container");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

// Mobile navigation menu

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("show");

    const isOpen = navigation.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Create an information paragraph

function createInfoParagraph(label, value, className) {
    const paragraph = document.createElement("p");
    paragraph.classList.add(className);

    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;

    paragraph.append(strong, document.createTextNode(value));

    return paragraph;
}

// Display business members

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const name = document.createElement("h2");
        name.textContent = member.name;

        const description = document.createElement("p");
        description.classList.add("business-tagline");
        description.textContent = member.description;

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        const memberInfo = document.createElement("div");
        memberInfo.classList.add("member-info");

        const email = createInfoParagraph(
            "Email",
            member.email,
            "member-email"
        );

        const phone = createInfoParagraph(
            "Phone",
            member.phone,
            "member-phone"
        );

        const address = createInfoParagraph(
            "Address",
            member.address,
            "member-address"
        );

        const website = document.createElement("p");
        website.classList.add("member-website");

        const websiteLabel = document.createElement("strong");
        websiteLabel.textContent = "URL: ";

        const websiteLink = document.createElement("a");
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = "_blank";
        websiteLink.rel = "noopener noreferrer";

        website.append(websiteLabel, websiteLink);

        let membershipName = "Member";

        if (member.membershipLevel === 3) {
            membershipName = "Gold";
        } else if (member.membershipLevel === 2) {
            membershipName = "Silver";
        }

        const membership = createInfoParagraph(
            "Membership Level",
            membershipName,
            "member-membership"
        );

        memberInfo.append(
            email,
            phone,
            address,
            website,
            membership
        );

        card.append(
            name,
            description,
            image,
            memberInfo
        );

        membersContainer.appendChild(card);
    });
}

// Fetch business data from JSON

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.textContent =
            "Unable to load business members. Please try again later.";
    }
}

// Grid view

gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

// List view

listButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

// Current year

const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();

// Last modification

const lastModification = document.querySelector("#last-modification");

lastModification.textContent = document.lastModified;

// Load members

getMembers();