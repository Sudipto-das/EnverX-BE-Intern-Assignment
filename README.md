# Blog API

This is a simple API for managing blog posts. It allows you to create, retrieve, update, and delete blog posts.

## Getting Started

Follow the instructions below to set up and run the project on your local machine.

### Prerequisites

- Node.js (version >= 14.0.0)
- MongoDB (running instance or connection URL)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sudipto-das/EnverX-BE-Intern-Assignment.git
   
  cd <cloned directory>
  npm install to install all dependency


### Api End Points
POST auth/signup - Signup user

POST auth/login - Login user 

GET blog/posts - Get all blog posts.

GET blog/posts/:id - Get a specific blog post by ID.

POST blog/posts - Create a new blog post.

PUT blog/posts/:id - Update an existing blog post.

DELETE blog/posts/:id - Delete a blog post.  

### token
open Postman
when  signup success you get a token copy that and paste it into Headers to create a key "Authorization"
do this "Bearer token"


