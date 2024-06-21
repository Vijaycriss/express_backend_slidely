# WinFormsApp2

This project demonstrates how to create a VB.NET Windows Forms application that interacts with an Express backend using HTTP requests. The VB.NET application allows users to submit form data, which is then stored in a JSON file via the Express backend.

Prerequisites
Before running this project, ensure you have the following installed:

Visual Studio: To open and run the VB.NET application.
Node.js: To run the Express backend server.
npm: Node.js package manager, typically installed with Node.js.
Getting Started
Setting Up the Express Backend
Clone the Repository: Clone this repository to your local machine.

Navigate to Backend Directory:

cd backend

Install Dependencies:

npm install

Start the Server:
npm start
The backend server should now be running at http://localhost:3000.

Running the VB.NET Application
Open Project in Visual Studio:

Open submit_google_form.sln file in Visual Studio.
Build and Run:

Build the solution (Ctrl + Shift + B).
Start debugging (F5) or run without debugging (Ctrl + F5).
Interacting with the Application:

Fill in the form fields (Name, Email, Phone, GitHub).
Click SUBMIT (or press Ctrl + S) to submit the form data.
Use Toggle Stopwatch button (Ctrl + T) to start and pause a stopwatch.
Use Next and Previous buttons to navigate through submitted forms.

Folder Structure
backend/: Contains the Express backend files.
submit_google_form/: VB.NET project directory.

Backend API Endpoints
POST /submit: Endpoint to submit form data.
GET /read: Endpoint to read all form submissions.
GET /search/: Endpoint to search a specific form submission by index.
DELETE /delete/:index: Endpoint to delete a form submission by index.

Technologies Used
VB.NET: Windows Forms application for frontend.
Express: Node.js framework for backend API.
JSON File: Used as a simple database to store form submissions.
