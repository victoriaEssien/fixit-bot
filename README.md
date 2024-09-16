# FixIT Bot (Tech support assistant)

## Overview

FixIT is an intelligent tool designed to assist users with common IT issues related to devices like laptops, phones, and MiFi units. It combines the power of AI and a comprehensive knowledge base to provide effective solutions and support. If the bot can't find a solution, it provides contact information for expert tech support agencies.

## Why Adopt This Tool?

### Benefits:
- **Instant Support**: Quickly get help for common IT issues without waiting in long support queues.
- **AI-Driven Responses**: Leverages advanced AI to understand and respond to user queries effectively.
- **Comprehensive Knowledge Base**: Access to a wide range of solutions for various common problems.
- **Expert Contacts**: If the bot can't resolve the issue, users receive contact details for tech support agencies.

## Features:
- AI-powered responses using Google Generative AI.
- Integration with a CSV-based knowledge base for device and issue-specific solutions.
- Conditional fallback to tech support contact information when no solution is found.

## Installation and Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Frontend (Client)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/victoriaEssien/fixit-bot.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd fixit-bot
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Build the Application:**
   ```bash
   npm run build
   ```

5. **Run the Application Locally:**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:5173`.

### Backend (Server)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/victoriaEssien/fixit-bot-server.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd fixit-bot-server
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add your API key:
   ```env
   API_KEY=your_google_ai_api_key
   ```

5. **Run the Server:**
   ```bash
   npm start
   ```

   The server will be running on `http://localhost:3001`.

## How It Works

1. **User Interaction**: Users send messages describing their IT issues.
2. **AI Processing**: The server uses Google Generative AI to generate a response based on the user’s message.
3. **Knowledge Base Lookup**: The server looks up solutions for the identified device and issue from a CSV file.
4. **Fallback**: If no solution is found, the bot provides contact information for tech support agencies.

## Link to Server Repository

You can find the server code and additional instructions [here](https://github.com/victoriaEssien/fixit-bot-server).

## FixIT Bot Demo


https://github.com/user-attachments/assets/d470c816-4312-49a1-884b-0c1367bc2984



## Conclusion

The Tech Support Bot is a powerful tool for providing quick and reliable IT support. Its combination of AI-driven responses and a detailed knowledge base makes it a valuable asset for anyone seeking efficient tech support solutions. Whether you're a developer looking to integrate this tool into your application or an end-user needing instant IT help, the Tech Support Bot is designed to meet your needs effectively.
