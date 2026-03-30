
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

This project uses Vite for local development and production builds.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-art-generator.git
    cd ai-art-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a local environment file:**
    Create a `.env.local` file in the project root:
    ```bash
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

## 🌐 Deployment to GitHub Pages

To make the application work on GitHub Pages, you cannot expose your API key in the client-side code. The best practice is to use GitHub Actions to securely inject the key during the deployment process.

### Step 1: Create a Repository Secret

1.  In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2.  Click **New repository secret**.
3.  Set the **Name** to `GEMINI_API_KEY`.
4.  Paste your Google Gemini API Key into the **Secret** field.
5.  Click **Add secret**.

### Step 2: Push the included GitHub Actions workflow

This repository now includes a GitHub Pages workflow at `.github/workflows/deploy.yml`. The workflow:

- installs dependencies with `npm ci`
- builds the app with Vite
- injects `GEMINI_API_KEY` at build time from GitHub Actions secrets
- uploads the generated `dist/` directory to GitHub Pages

### Step 3: Configure GitHub Pages Source

1.  In your GitHub repository, go to **Settings** > **Pages**.
2.  Under **Build and deployment**, set the **Source** to **GitHub Actions**.

Now, every time you push a change to your `main` branch, the GitHub Action will build and deploy the site automatically. Your live site will be available at `https://<your-github-username>.github.io/<your-repo-name>/`.
