
document.addEventListener("DOMContentLoaded", function () {

    const errorMessage = document.getElementById("errorMessage");
    const portfolioContent = document.getElementById("portfolioContent");

    // LOAD JSON DATA USING FETCH API
    async function loadPortfolio() {
        try {
            const response = await fetch("data.json");

            if (!response.ok) {
                throw new Error("Unable to load JSON file");
            }

            const data = await response.json();

            renderPortfolio(data);

            portfolioContent.hidden = false;

        } catch (error) {
            console.error("Error:", error);

            errorMessage.hidden = false;
            errorMessage.textContent =
                "Unable to load portfolio data. Please check data.json and run using VS Code Live Server.";
        }
    }

    // DISPLAY ALL PORTFOLIO INFORMATION
    function renderPortfolio(data) {

        const personal = data.personal;

        // NAVBAR
        document.getElementById("logo").textContent =
            personal.name;

        // HERO
        document.getElementById("heroName").textContent =
            personal.name;

        document.getElementById("heroRole").textContent =
            personal.role;

        document.getElementById("heroIntro").textContent =
            personal.introduction;

        document.getElementById("profileImage").src =
            personal.profileImage;

        document.getElementById("profileImage").alt =
            personal.name;

        document.getElementById("resumeButton").href =
            personal.resume;

        // ABOUT
        document.getElementById("aboutDescription").textContent =
            data.about;

        document.getElementById("personalDetails").innerHTML = `
            <span><i class="fa-solid fa-envelope"></i> ${personal.email}</span>
            <span><i class="fa-solid fa-phone"></i> ${personal.phone}</span>
        `;

        // SKILLS
        const skillsContainer =
            document.getElementById("skillsContainer");

        skillsContainer.innerHTML = data.skills.map(skill => `
            <div class="col-6 col-md-4 col-lg-4">
                <div class="skill-card">
                    <div class="skill-icon">
                        <i class="${skill.icon}"></i>
                    </div>
                    <h5>${skill.name}</h5>
                    <p>${skill.level}</p>
                </div>
            </div>
        `).join("");

        // PROJECTS
        const projectsContainer =
            document.getElementById("projectsContainer");

        projectsContainer.innerHTML = data.projects.map(project => `
            <div class="col-md-6 col-lg-4">
                <div class="project-card">
                    <img src="${project.image}" alt="${project.name}" loading="lazy">

                    <div class="project-content">
                        <h4>${project.name}</h4>
                        <p>${project.description}</p>

                        <div class="tech-tags">
                            ${project.technologies.map(tech =>
                                `<span>${tech}</span>`
                            ).join("")}
                        </div>

                        <a href="${project.link}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="project-link">
                            View Project <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join("");

        // EDUCATION
        const educationContainer =
            document.getElementById("educationContainer");

        educationContainer.innerHTML = data.education.map(edu => `
            <div class="education-card">
                <h4><i class="fa-solid fa-graduation-cap"></i> ${edu.course}</h4>
                <p><strong>${edu.college}</strong></p>
                <p>${edu.semester} | ${edu.duration}</p>
                <p>${edu.details}</p>
            </div>
        `).join("");

        // CERTIFICATIONS
        const certificationsContainer =
            document.getElementById("certificationsContainer");

        certificationsContainer.innerHTML =
            data.certifications.map(cert => `
                <div class="col-md-6 col-lg-4">
                    <div class="certificate-card">
                        <i class="fa-solid fa-award"></i>
                        <h5>${cert.name}</h5>
                        <p>${cert.organization}</p>
                        <p>${cert.year}</p>
                    </div>
                </div>
            `).join("");

        // CONTACT DETAILS
        document.getElementById("contactDetails").innerHTML = `
            <div><i class="fa-solid fa-envelope"></i> ${personal.email}</div>
            <div><i class="fa-solid fa-phone"></i> ${personal.phone}</div>
            <div><i class="fa-solid fa-location-dot"></i> ${personal.location}</div>
        `;

        // SOCIAL LINKS
        renderSocials(data.socials);

        // FOOTER
        document.getElementById("footerName").textContent =
            personal.name;

        document.getElementById("copyright").textContent =
            `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;
    }

    // SOCIAL MEDIA LINKS
    function renderSocials(socials) {

        const iconMap = {
            github: "fa-brands fa-github",
            linkedin: "fa-brands fa-linkedin",
            instagram: "fa-brands fa-instagram",
            twitter: "fa-brands fa-x-twitter"
        };

        const links = Object.entries(socials).map(([name, url]) => `
            <a href="${url}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${name}">
                <i class="${iconMap[name] || 'fa-solid fa-link'}"></i>
            </a>
        `).join("");

        document.getElementById("heroSocials").innerHTML = links;
        document.getElementById("footerSocials").innerHTML = links;
    }

    // CONTACT FORM VALIDATION
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {
            formMessage.style.color = "#B02A37";
            formMessage.textContent =
                "Please fill in all the fields.";
            return;
        }

        if (!emailPattern.test(email)) {
            formMessage.style.color = "#B02A37";
            formMessage.textContent =
                "Please enter a valid email address.";
            return;
        }

        formMessage.style.color = "#38734B";
        formMessage.textContent =
            "Thank you! Your message is ready to send.";

        // Opens the visitor's email application
        const personalEmail = document.getElementById("contactDetails")
            .textContent.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);

        if (personalEmail) {
            const mailto =
                `mailto:${personalEmail[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    "Name: " + name +
                    "\nEmail: " + email +
                    "\n\n" + message
                )}`;

            window.location.href = mailto;
        }

        contactForm.reset();
    });

    // START
    loadPortfolio();

});
