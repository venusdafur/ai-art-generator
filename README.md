
# AI Art Generator (Imagen 3)

A clean, modern, and responsive web application that allows you to generate stunning and unique images from text prompts using Google's powerful Imagen 3 model. Describe your vision, and let the AI bring it to life in seconds.

**[➡️ View Live Demo (Requires Setup)](#deployment-to-github-pages)**

![AI Art Generator Screenshot](https://storage.googleapis.com/framer-media/assets/3L1sA6pVTk9n0Jb6d2tI41Jg.png)

## ✨ Features

- **Text-to-Image Generation**: Utilizes the `imagen-3.0-generate-002` model for high-quality image creation.
- **Example Prompts**: Get inspired with a curated list of example prompts.
- **Download Images**: Easily save your generated artwork in JPEG format.
- **Responsive Design**: A beautiful and functional interface on both desktop and mobile devices.
- **Modern UI**: Built with React and Tailwind CSS for a sleek and fast user experience.
- **Clear Feedback**: Integrated loading spinners and user-friendly error messages.

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini API (`@google/genai`)
- **Dependencies**: Loaded via ESM for a build-less setup.

## 🚀 Getting Started

This project is set up to run directly in the browser without a traditional build step.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-art-generator.git
    cd ai-art-generator
    ```

2.  **Handle the API Key:**
    The application is hard-coded to look for the API key in `process.env.API_KEY`. For local testing, you must temporarily modify the service file.

    - Open `services/geminiService.ts`.
    - **Temporarily** replace `process.env.API_KEY` with your actual API key string:
      ```typescript
      // Before
      const API_KEY = process.env.API_KEY;

      // After (for local testing only)
      const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
      ```
    - **⚠️ IMPORTANT:** Do **NOT** commit this change. This is for local testing only. Revert this change before pushing your code. The deployment section below details the secure way to handle keys.

3.  **Run the application:**
    Since there is no build server, you can use a simple static file server or a browser extension like "Live Server" for VS Code to serve the `index.html` file.

## 🌐 Deployment to GitHub Pages

To make the application work on GitHub Pages, you cannot expose your API key in the client-side code. The best practice is to use GitHub Actions to securely inject the key during the deployment process.

### Step 1: Create a Repository Secret

1.  In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret**.
3.  Set the **Name** to `GEMINI_API_KEY`.
4.  Paste your Google Gemini API Key into the **Secret** field.
5.  Click **Add secret**.

### Step 2: Create the GitHub Actions Workflow

1.  Create a directory named `.github/workflows` in the root of your project.
2.  Inside that directory, create a new file named `deploy.yml`.
3.  Paste the following content into `deploy.yml`:

    ```yaml
    name: Deploy to GitHub Pages

    on:
      push:
        branches:
          - main # Or whichever branch you use as your primary

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout 🛎️
            uses: actions/checkout@v4

          - name: Replace API Key 🔑
            # This step securely replaces the placeholder in the service file
            # with the secret key you configured in repository settings.
            run: |
              sed -i "s|process.env.API_KEY|'${{ secrets.GEMINI_API_KEY }}'|g" services/geminiService.ts
            
          - name: Setup Pages
            uses: actions/configure-pages@v4

          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: '.' # Upload all files from the root directory

          - name: Deploy to GitHub Pages 🚀
            id: deployment
            uses: actions/deploy-pages@v4
    ```

### Step 3: Configure GitHub Pages Source

1.  In your GitHub repository, go to **Settings** > **Pages**.
2.  Under **Build and deployment**, set the **Source** to **GitHub Actions**.

Now, every time you push a change to your `main` branch, the GitHub Action will automatically run, replace the API key placeholder, and deploy your application to GitHub Pages. Your live site will be available at `https://<your-github-username>.github.io/<your-repo-name>/`.
