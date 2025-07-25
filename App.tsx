
import React, { useState, useCallback } from 'react';
import { generateImage } from './services/geminiService';
import Spinner from './components/Spinner';
import Alert from './components/Alert';
import { WandIcon, DownloadIcon } from './components/Icon';

const EXAMPLE_PROMPTS = [
  "A majestic lion with a shimmering, cosmic mane, standing on a lunar surface, photorealistic.",
  "An enchanted forest at twilight, with glowing mushrooms and streams of sparkling water, fantasy art.",
  "A retro-futuristic cityscape with flying cars and neon signs in a vaporwave aesthetic, detailed illustration.",
  "An oil painting of a cozy library cafe on a rainy day, with steam rising from a coffee cup."
];

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(EXAMPLE_PROMPTS[0]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImageUrl = await generateImage(prompt);
      setImageUrl(generatedImageUrl);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  
  const handleExamplePromptClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Controls */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <header className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-white">AI Art Generator</h1>
            <p className="text-slate-400 mt-2">Powered by Google's Imagen 3 Model</p>
          </header>
          
          <div className="space-y-4">
             <label htmlFor="prompt" className="block text-lg font-medium text-slate-300">Enter your prompt</label>
             <textarea
                id="prompt"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="e.g., A cat wearing a spacesuit, floating in space"
                className="w-full h-32 p-3 bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                disabled={isLoading}
             />
          </div>

          <div className="space-y-3">
             <h3 className="text-md font-medium text-slate-300">Or try an example</h3>
             <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((ex, index) => (
                    <button 
                        key={index}
                        onClick={() => handleExamplePromptClick(ex)}
                        className="px-3 py-1.5 bg-slate-700 text-slate-300 text-sm rounded-full hover:bg-slate-600 transition duration-200 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {ex.split(',')[1] || 'Inspire me'}
                    </button>
                ))}
             </div>
          </div>

          <button
            onClick={handleGenerateImage}
            disabled={isLoading || !prompt}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-indigo-900 disabled:text-slate-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100"
          >
            {isLoading ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : (
              <>
                <WandIcon />
                Generate Image
              </>
            )}
          </button>
          {error && <Alert message={error} onClose={() => setError(null)} />}
        </div>

        {/* Right Panel: Image Display */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="w-full aspect-square bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center overflow-hidden relative group">
              {isLoading && <Spinner size="lg" />}
              {!isLoading && !imageUrl && (
                  <div className="text-center text-slate-500">
                    <p>Your generated image will appear here.</p>
                  </div>
              )}
              {imageUrl && (
                  <>
                    <img 
                        src={imageUrl} 
                        alt={prompt} 
                        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 animate-[fadeIn_0.5s_forwards]"
                        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    />
                     <a
                        href={imageUrl}
                        download={`ai-art-${Date.now()}.jpeg`}
                        className="absolute bottom-4 right-4 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm hover:bg-black/75"
                        title="Download Image"
                      >
                       <DownloadIcon />
                    </a>
                  </>
              )}
          </div>
        </div>
      </div>
      <footer className="text-center text-slate-500 mt-12">
        <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
      </footer>
       <style>{`
        @keyframes fadeIn {
            to { opacity: 1; }
        }
       `}</style>
    </div>
  );
};

export default App;
