// ==========================================
// GLOBAL STATE
// Stores the full list of skills fetched from
// json-server, so filtering can work without
// re-fetching from the server every time.
// ==========================================
let allSkills = [];


// ==========================================
// FETCH SKILLS FROM JSON-SERVER
// Uses Axios + async/await to GET all skills,
// then triggers rendering.
// ==========================================
async function fetchSkills() {
  try {
    const response = await axios.get("http://localhost:3000/skills");
    allSkills = response.data;
    renderSkills(allSkills);
  } catch(error) {
    console.error("Error fetching skills:", error);
  }
}

// ==========================================
// RENDER SKILL CARDS
// Builds and injects card HTML into the DOM
// for a given array of skills. Also handles
// truncating long descriptions.
// ==========================================
function renderSkills(skills){
  const container = document.getElementById('cardsContainer');
  if(!container) return;

  container.innerHTML = " ";

  skills.forEach(function(skill) {
    const charLimit = 80;
    const isLong = skill.shortDescription.length > charLimit;
    const shortText = skill.shortDescription.slice(0, charLimit) + "...";

    const cardHTML = `
    <div class="col-md-4">
     <div class="card skill-card">
       <div class="card-body">
         <span class="badge category-badge ${skill.skillCategory}">${skill.skillCategory}</span>
         <h5 class="card-title mt-2">${skill.fullName}</h5>
         <p class="card-text">
         <span class="desc-text">${isLong ? shortText : skill.shortDescription}</span>
         ${isLong ? `<a href="#" class="toggle-desc" data-full="${skill.shortDescription}" data-short="${shortText}">Show more</a>` : ""}</p>
         <p class="card-meta">🕒 ${skill.availability}</p>
         <p class="card-meta">📍 ${skill.location}</p>
         <a href="tel:${skill.contactNumber}" class="contact-link">📞 Contact</a> 
         <button class="delete-btn" data-id="${skill.id}">🗑️</button>
       </div>
     </div>
    </div>
    `;
    container.innerHTML += cardHTML;
  });

   setupDescriptionToggles();
   setupDeleteButtons();
}

// ==========================================
// DESCRIPTION SHOW MORE / SHOW LESS
// Toggles full vs truncated description text
// on click.
// ==========================================
function setupDescriptionToggles() {
  const toggles = document.querySelectorAll(".toggle-desc");

  toggles.forEach(function (link) {
    link.addEventListener("click", function (event){
      event.preventDefault();
      const textSpan = link.previousElementSibling;

      if (link.textContent === "Show more.") {
        textSpan.textContent = link.dataset.full;
        link.textContent = "Show less.";
      } else {
        textSpan.textContent = link.dataset.short;
        link.textContent = "Show more.";
      }
    });
  });
}


// ==========================================
// DELETE SKILL LISTING
// Sends a DELETE request to json-server for a
// specific skill, then re-fetches the list.
// ==========================================
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", async function () {
      const skillId = button.dataset.id;

      const confirmDelete = confirm("Are you sure you want to remove this listing?");
      if(!confirmDelete) return;

      try {
        await axios.delete(`http://localhost:3000/skills/${skillId}`);
        fetchSkills();
      } catch (error) {
        console.error("Error dleting skill:", error);
        alert("Could not delete. Please try again.")
      }
    });
  });
}

// ==========================================
// CATEGORY FILTERING
// Filters displayed skills by category using
// Array.filter(), and toggles the active pill.
// ==========================================
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(function(button) {
    button.addEventListener("click",function (){
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      const selectedCategory = button.dataset.category;

      if(selectedCategory === "all") {
        renderSkills(allSkills);
      } else {
        const filtered = allSkills.filter(function (skill){
          return skill.skillCategory === selectedCategory;
        });
        renderSkills(filtered);
      }
    });
  });
}


// ==========================================
// FORM SUBMISSION (Add Your Skill page)
// Collects field values, validates, and POSTs
// a new skill to json-server.
// ==========================================
function setupFormSubmission() {
  const form = document.getElementById("skillForm");

  if(!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const newSkill = {
      fullName: document.getElementById("fullName").value,
      skillCategory: document.getElementById("skillCategory").value,
      shortDescription: document.getElementById("shortDescription").value,
      availability: document.getElementById("availability").value,
      location: document.getElementById("location").value,
      contactNumber: document.getElementById("contactNumber").value
    };

    try {
      await axios.post("http://localhost:3000/skills", newSkill);
      alert("Your skill has been listed");
      form.reset();
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error submitting skill:",error);
      alert("Something went wrong. Please try again.")
    }
  });
}

// ==========================================
// INITIALIZE
// Run everything once the script loads.
// ==========================================
fetchSkills();
setupFilterButtons();
setupFormSubmission();