
import { GoogleGenAI } from "@google/genai";

const FALLBACK_API_KEY = process.env.API_KEY;

/**
 * Generates an image using the Imagen 4 model.
 * @param prompt The text prompt to generate an image from.
 * @param apiKey The Gemini API key provided by the user.
 * @returns A promise that resolves to a base64 encoded JPEG image string.
 */
export const generateImage = async (prompt: string, apiKey?: string): Promise<string> => {
  const resolvedApiKey = apiKey?.trim() || FALLBACK_API_KEY;
  if (!resolvedApiKey) {
    throw new Error("Enter a Google Gemini API key to generate an image.");
  }

  const ai = new GoogleGenAI({ apiKey: resolvedApiKey });

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
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
