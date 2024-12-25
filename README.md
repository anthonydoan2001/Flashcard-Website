# Flashcard Management Application

## Overview
The Flashcard Management Application is a full-stack project designed to help users create, manage, and interact with flashcards organized into folders. This application supports:

- Creating and editing folders.
- Adding, editing, and deleting flashcards.
- Importing flashcards from Excel files.
- Generating multiple-choice tests from flashcards.

This application provides an intuitive interface and a robust backend to enhance user productivity.

---

## Features

### Folder Management
- Create folders with a name and description.
- Edit or delete existing folders.

### Flashcard Management
- Add flashcards with topics and explanations to folders.
- Edit or delete individual flashcards.
- Import flashcards in bulk from Excel files (.xlsx).

### Testing Mode
- Generate multiple-choice tests from flashcards.
- Shuffle answers to improve learning outcomes.

---

## Technology Stack

### Frontend
- **React.js**: For building the user interface.
- **CSS Modules**: For component-specific styling.
- **React Router**: For routing and navigation.

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Backend framework for routing and API management.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: ODM for MongoDB integration.

### Tools & Libraries
- **XLSX**: For parsing and handling Excel file imports.

---

## Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: Set up a MongoDB instance.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/flashcard-management-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd flashcard-management-app
   ```

3. Install dependencies for the frontend and backend:
   ```bash
   cd flashcard-backend
   npm install

   cd ../flashcard-frontend
   npm install
   ```

4. Set up MongoDB:
   - Create a database named `flashcard-app`.
   - Update MongoDB connection details in `flashcard-backend/config/db.js`.

5. Start the backend server:
   ```bash
   cd flashcard-backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd ../flashcard-frontend
   npm start
   ```

7. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Folders
- `GET /api/folders`: Fetch all folders.
- `POST /api/folders`: Create a new folder.
- `PUT /api/folders/:id`: Update folder details.
- `DELETE /api/folders/:id`: Delete a folder.

### Flashcards
- `GET /api/folders/:id/cards`: Fetch all flashcards in a folder.
- `POST /api/folders/:id/cards`: Add a flashcard to a folder.
- `PUT /api/folders/:id/cards/:cardIndex`: Update a specific flashcard.
- `DELETE /api/folders/:id/cards/:cardIndex`: Delete a flashcard.

---

## Usage
1. **Creating Folders**: Use the "Add Folder" button to create folders for organizing flashcards.
2. **Managing Flashcards**: Navigate to a folder and add, edit, or delete flashcards as needed.
3. **Importing Flashcards**: Use the "Import from Excel" feature to add multiple flashcards at once.
4. **Testing Mode**: Generate a multiple-choice test for quick review and practice.

---


## Contact

For questions or suggestions, please contact:
- **Name**: Anthony Doan
- **Email**: anthonydoanwork@gmail.com
- **GitHub**: [anthonydoan2001](https://github.com/anthonydoan2001)

