-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerkid TEXT NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    profilepic TEXT,
    bio TEXT,
    datejoined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usertype VARCHAR(255)
);

-- Event Categories Table
CREATE TABLE event_categories (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Events Table
CREATE TABLE events (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userid INT REFERENCES users(id) ON DELETE CASCADE,
    eventname VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT REFERENCES event_categories(id),
    eventdate DATE NOT NULL,
    eventtime TIME NOT NULL,
    location VARCHAR(255),
    price DECIMAL(10, 2),
    maxattendees INT,
    imageurl Text,
    ispublic BOOLEAN DEFAULT TRUE,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RSVP Table
CREATE TABLE rsvp (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userid INT REFERENCES users(id) ON DELETE CASCADE,
    eventid INT REFERENCES events(id) ON DELETE CASCADE,
    status VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Details Table
CREATE TABLE event_details (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    rsvp_id INT REFERENCES rsvp(id) ON DELETE CASCADE,
    feedback TEXT,
    eventid INT REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE (rsvp_id, eventid) 
);

-- Comments Table
CREATE TABLE comments (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    eventid INT REFERENCES events(id) ON DELETE CASCADE,
    userid INT REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL
);

-- Community Post Table
CREATE TABLE community_posts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userid INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    posttype VARCHAR(255) NOT NULL,
    category_id INT REFERENCES event_categories(id),
    createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



