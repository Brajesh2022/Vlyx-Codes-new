# Deploying to Firebase

This project is configured for Firebase Hosting and Cloud Functions.

## Prerequisites

1.  **Node.js**: Ensure you have Node.js installed (version 18 or later).
2.  **Firebase CLI**: Install the Firebase tools globally.
    ```bash
    npm install -g firebase-tools
    ```

## Setup

1.  **Login**:
    ```bash
    firebase login
    ```

2.  **Initialize Project**:
    Since the configuration files (`firebase.json`, `.firebaserc`) are already created, you just need to associate your project ID.
    ```bash
    firebase use --add
    ```
    Select your Firebase project from the list.

3.  **Install Dependencies**:
    Navigate to the functions directory and install dependencies.
    ```bash
    cd functions
    npm install
    cd ..
    ```

## Configuration

Set your Gemini API Key as an environment variable for the functions.

For **Firebase Functions Gen 2** (which this project uses), use `.env` files or Secret Manager.

**Option A: Using .env (Simpler for development)**
Create a file `functions/.env`:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

**Option B: Using Secrets (Recommended for Production)**
1.  Enable the Secret Manager API in Google Cloud Console.
2.  Store the secret:
    ```bash
    firebase functions:secrets:set GEMINI_API_KEY
    ```
3.  Update `functions/index.js` to use the secret (requires code change to add `secrets: ["GEMINI_API_KEY"]` to the `onRequest` options).
    *Currently, the code expects `process.env.GEMINI_API_KEY`, which works with `.env` files automatically.*

## Deployment

Deploy both Hosting and Functions:

```bash
firebase deploy
```

## Verification

Once deployed, your site will be available at `https://<your-project-id>.web.app`.
The API endpoints will be proxied correctly:
-   `https://<your-project-id>.web.app/api/chat` -> Triggers `chat` function.
-   `https://<your-project-id>.web.app/api/estimate` -> Triggers `estimate` function.
