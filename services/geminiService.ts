
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("Missing Google Gemini API Key. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates an image using the Imagen 3 model.
 * @param prompt The text prompt to generate an image from.
 * @returns A promise that resolves to a base64 encoded JPEG image string.
 */
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("The API did not return any images. The prompt might be unsafe or invalid.");
    }
  } catch (e) {
    console.error("Error generating image:", e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during image generation.';
    throw new Error(`Failed to generate image: ${errorMessage}`);
  }
};
