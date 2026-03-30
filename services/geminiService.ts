
import { GoogleGenAI } from "@google/genai";

const FALLBACK_API_KEY = process.env.API_KEY;
const IMAGEN_MODELS = new Set(['imagen-4.0-generate-001']);

export const IMAGE_MODELS = {
  imagen4: 'imagen-4.0-generate-001',
  nanoBanana: 'gemini-2.5-flash-image',
  nanoBananaPro: 'gemini-3-pro-image-preview',
} as const;

export type ImageModel = typeof IMAGE_MODELS[keyof typeof IMAGE_MODELS];

interface GeneratedImageResult {
  dataUrl: string;
  mimeType: string;
}

const getFileExtension = (mimeType: string): string => {
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/webp') return 'webp';
  return 'jpeg';
};

/**
 * Generates an image using the selected Google image model.
 * @param prompt The text prompt to generate an image from.
 * @param apiKey The Gemini API key provided by the user.
 * @param model The selected Google image model.
 * @returns A promise that resolves to the generated image data and mime type.
 */
export const generateImage = async (
  prompt: string,
  apiKey?: string,
  model: ImageModel = IMAGE_MODELS.imagen4,
): Promise<GeneratedImageResult> => {
  const resolvedApiKey = apiKey?.trim() || FALLBACK_API_KEY;
  if (!resolvedApiKey) {
    throw new Error("Enter a Google Gemini API key to generate an image.");
  }

  const ai = new GoogleGenAI({ apiKey: resolvedApiKey });

  try {
    if (IMAGEN_MODELS.has(model)) {
      const response = await ai.models.generateImages({
        model,
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return {
          dataUrl: `data:image/jpeg;base64,${base64ImageBytes}`,
          mimeType: 'image/jpeg',
        };
      }

      throw new Error("The API did not return any images. The prompt might be unsafe or invalid.");
    }

    const interaction = await ai.interactions.create({
      model,
      input: prompt,
      response_modalities: ['image'],
    });

    for (const output of interaction.outputs ?? []) {
      if (output.type === 'image' && output.data && output.mime_type) {
        return {
          dataUrl: `data:${output.mime_type};base64,${output.data}`,
          mimeType: output.mime_type,
        };
      }
    }

    throw new Error("The API did not return any images. The prompt might be unsafe or invalid.");
  } catch (e) {
    console.error("Error generating image:", e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during image generation.';
    throw new Error(`Failed to generate image: ${errorMessage}`);
  }
};

export { getFileExtension };
