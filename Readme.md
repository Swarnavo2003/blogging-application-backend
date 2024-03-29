# Blogging Applicaion Backend

This is a simple web application for conducting online Blogging. This project implements the backend functionality for a blogging application. It allows users to create, manage, and view blog posts.

## Routes

### User Authentication

- POST /signup: Create a new user account.
- POST /login: Log in to an existing account using Aadhar card number and password.

### User

- GET /: Get the users.

### Blogging

- GET /: Get all the blogs.
- Post /add: Create a new blog.
- PUT /update/:id: Edit the blog user created.
- DELETE /delete/:id: Delete the blog user created.
- GET /:id: Get the blog of the id provided.
- GET /userBlogs/:id: Get the blog using user id

## Functionality

- Allow users to create new accounts if your application supports user registration.
- Users can log in to their existing accounts using credentials.
- Users can create new blog posts with titles and content.
- Users can edit their existing blog posts, allowing them to modify title and content.
- Users can delete blog posts they created.
- Users can view a list of all the blogs available in the application (public or their own, depending on implementation).
- Users can view the details of a specific blog post, including title, content, and potentially author information (depending on implementation).
