Locker System Simulation

This repository contains both the frontend React application and the backend PHP service for a Locker System Simulation.
Setup Instructions

Prerequisites

    Node.js and npm installed
    PHP installed (e.g., via XAMPP, WAMP, or LAMP)
    MySQL database server running
    PHPMyAdmin for database management

Step 1: Clone the Repository

Clone this repository to your local machine.

git clone <repository_url>
cd locker-system

Step 2: Setup Backend

Copy the api.php file from the backend/ folder and paste it into the htdocs/locker-app-backend directory. Create the directory if it does not exist.

cp backend/api.php /path_to_xampp/htdocs/locker-app-backend/

Step 3: Setup Database

Set up the database tables using PHPMyAdmin or via the MySQL command line:

    Create a database named locker_db.
    Import the backend/locker_db.sql file into the newly created database.
        Using PHPMyAdmin:
            Open PHPMyAdmin.
            Create a new database named locker_db.
            Select the locker_db database.
            Use the Import tab to upload and import the backend/locker_db.sql file.
        Using MySQL command line:
            mysql -u root -p
            CREATE DATABASE locker_db;
            USE locker_db;
            SOURCE path/to/backend/locker_db.sql;

Step 4: Setup Frontend

Open a terminal and navigate to the frontend directory.
    cd locker-system
Install the necessary npm packages.
    npm install
Start the React development server.
    npm start

Step 5: Ensure Backend Services are Running

Make sure the Apache server and MySQL database server are running. This can be done using XAMPP, WAMP, or LAMP, assuming you are running on the default ports for PHP (80) and MySQL (3306).

Step 6: Access the Application

Open your web browser and navigate to:
    http://localhost:3000

You will be presented with the Locker System Simulation application.

This README provides a detailed and professional guide for setting up and running the Locker System Simulation application, ensuring clarity and ease of use.