https://venusdafur.github.io/ai-art-generator/


# AI Art Generator (Imagen 4)

A clean, modern, and responsive web application that allows you to generate stunning and unique images from text prompts using Google's Imagen 4 model. Describe your vision, and let the AI bring it to life in seconds.

## ✨ Features

- **Text-to-Image Generation**: Utilizes the `imagen-4.0-generate-001` model for high-quality image creation.
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

3.  **Run the application:**
    ```bash
    npm run dev
    ```

4.  **Enter your Gemini API key in the app:**
    The application prompts for a Google Gemini API key in the page UI and stores it in your browser's local storage on that device.

## 🌐 Deployment to GitHub Pages

The GitHub Pages deployment is fully static. Users provide their own Gemini API key in the page UI, so no repository secret is required for the site to work.

### Step 1: Push the included GitHub Actions workflow

This repository includes a GitHub Pages workflow at `.github/workflows/deploy.yml`. The workflow installs dependencies, builds the app with Vite, and uploads the generated `dist/` directory to GitHub Pages.

### Step 2: Configure GitHub Pages Source

1.  In your GitHub repository, go to **Settings** > **Pages**.
2.  Under **Build and deployment**, set the **Source** to **GitHub Actions**.

Now, every time you push a change to your `main` branch, the GitHub Action will build and deploy the site automatically. Visitors can enter their own Gemini API key in the page UI. Your live site will be available at `https://<your-github-username>.github.io/<your-repo-name>/`.
