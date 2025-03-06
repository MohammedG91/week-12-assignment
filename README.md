## **Local Skills Hub**

Team members: Mohammed, Amina, Sita, Jae

Vercel link: week-12-assignment-weld.vercel.app

Repo link: https://github.com/MohammedG91/week-12-assignment

---

# **Project description**

A platform that enables users to connect with their local community, share and discover skills, attend workshops, and create or join events. Users can manage their profiles, update their information, explore various local events, and interact with others to foster skill-sharing and personal growth.

---

# **Problem domain**

Providing a platform for local community members to share skills, attend and manage events, and engage with others in their area. Users will be able to create, browse, and interact with events, manage profiles, contact the team, and authenticate using secure login methods, while the platform adapts to various device screen sizes for an optimal experience.

---

# **USER STORIES**

_Web Fundamentals_

🐿️ As a user, I want the website to have a clear layout with a header, footer, and navigation bar, so I can easily find information and navigate through pages.

🐿️ As a user, I want the website to adjust to my screen size, whether I’m on a phone, tablet, or desktop, for an optimal experience.

🐿️ As a user, I want the website to be easy to use and visually appealing, with a simple design that helps me navigate through events, team info, and contact details.

🐿️ As a user, I want a “back to top” button, so I can easily go back to the top of the page without scrolling manually.

🐿️ As a user with accessibility needs, I expect images to have alt text, and the site should be usable with screen readers and keyboard navigation for an inclusive experience.

_Programming Logic_

🐿️ As a user, I want to manage my profile, so I can update my info, track shared events, and see my activity in the community.

🐿️ As a user, I want to contact the team via a contact form, so I can send messages or ask questions easily.

🐿️ As a user, I want to explore local events and workshops, so I can join skill-sharing opportunities and learn from others.

🐿️ As a developer, I want to use Clerk for secure logins, so users can log in safely and access their personalized content.

🐿️ As a developer, I want to create profile management routes, allowing users to update their info, view their shared events, and interact with the platform.

🐿️ As a developer, I want to handle contact form submissions, so users can reach the team with questions or requests.

🐿️ As a user, I want to view event details like time, location, and description when I click on an event, so I can decide if I want to attend.

🐿️ As a developer, I want to store and retrieve event data, so users can access up-to-date event information.

🐿️ As a developer, I want users to submit and manage events on their profile, so they can share, view, and manage their events with ease.

🐿️ As a developer, I want users to edit or delete their posts, so they can keep their event information and community posts accurate.

_Stretch Goals_

🐿️ As a user, I want to filter events by category or location, so I can easily find events that match my interests or are nearby.

🐿️ As a user, I want to leave feedback on events, so I can share my experience and help others decide which events to attend.

🐿️ As a user, I want to RSVP to events, so I can confirm my attendance and let organizers know how many people to expect.

---

# **Wireframe**

Next.js – The primary framework for building the application with server-side rendering (SSR) and static site generation (SSG).

Radix UI – Accessible UI components for building custom interfaces.

Framer Motion – Library for smooth animations and transitions.

PostgreSQL (PG) – Database for storing and managing data.

Material UI (MUI) – UI components for a consistent and responsive header design.

---

# **Instructions on how to run your app**

_Instructions for Users:_

Visit the website to sign up, manage your profile, explore local events, connect with the community, and reach out to the team for any assistance.
(week-12-assignment-weld.vercel.app.)

_Instructios for developers:_

1.  Fork the repository (check "copy the main branch only") and clone your fork to your local machine

2.  Run npm install

3.  Set up environment variables: Create a .env file in the root directory and add your configuration details (e.g., API keys, database URL, Clerk API keys). Example:

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your clerk key>
    CLERK_SECRET_KEY=<your clerk secret key>
    NEXT_PUBLIC_DATABASE_URL=<your database url, copy the tables from the schema.sql file>

4.  Create the database schema by running the SQL commands in schema.sql in your database (eg. by running the commands in Supabase Query Editor)

5.  Run npm run dev to start the development server

6.  Open http://localhost:3000 with your browser to see the site

7.  Log in: Use the Clerk authentication to log in to your account and start using the app.

That’s it! You should now be able to access and use your Local Skill Share app locally

---

# **Lighthouse report:**

---

# **Reflections:**

Please mention the requirements you met and which goals you achieved for this assignment.

🎯 Were there any requirements or goals that you were not quite able to achieve?

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

🎯What went really well and what could have gone better?

    Team collaboration went very well, we had 0 issues, and it went as good as it could have. Using git as the version control software went perfect, and not once did we have any issues or merge conflicts.

🎯Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).

🎯Describing errors or bugs you encountered while completing your assignment.

---

#**References:**

Third-party APIs, CSS resets, icons, images...

https://mui.com/material-ui/getting-started/installation/

https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
