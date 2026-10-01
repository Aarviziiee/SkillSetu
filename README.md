# SkillSetu — Local Skills for Hire

SkillSetu is a responsive, interactive web platform for discovering and offering local skills — tutoring, repairs, tailoring, and creative work — in your community. It replaces unstructured word-of-mouth recommendations with a structured, filterable listings board.

## Features

- **Browse skill listings** with category badges, availability, location, and contact info
- **Filter by category** (Tutoring, Repairs, Tailoring, Creative) with instant client-side filtering
- **Add a new skill** via a validated form, saved through a REST API
- **Delete listings** directly from the card view
- **Show more / show less** toggle for long descriptions, keeping card heights consistent
- **Fully responsive** — mobile, tablet, and desktop layouts via Bootstrap's grid system
- **Graceful error handling** for failed network requests


## Tech Stack

- HTML5 (semantic structure)
- CSS3 + Bootstrap 5 (responsive layout, custom styling)
- JavaScript (ES6+) — async/await, DOM manipulation, array methods
- Axios — HTTP requests
- json-server — mock REST API for local data persistence

  
## Project Structure

```
SkillSetu/
├── index.html # Home / listings page
├── add-skill.html # Add Your Skill form page
├── style.css # Custom styling
├── script.js # All JavaScript logic
├── db.json # Mock database for json-server
└── package.json
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed


### Installation & Running Locally

1. Clone the repository
```
git clone https://github.com/Aarviziiee/SkillSetu.git
cd SkillSetu
```

2. Install dependencies
```
npm install
```

3. Start the mock backend server
```
npx json-server --watch db.json --port 3000
```

4. Open `index.html` in your browser (recommended: using a Live Server extension in VS Code)
The app will fetch skill listings from `http://localhost:3000/skills` — make sure `json-server` is running before loading the page.


## Design Process

Both screens (Home/Listings and Add Your Skill) were designed and prototyped in Figma before development, including clickable navigation between screens, to plan layout,
spacing, and user flow ahead of coding.


## Future Improvements

- Edit functionality for existing listings
- Search bar alongside category filters
- User authentication for managing personal listings
