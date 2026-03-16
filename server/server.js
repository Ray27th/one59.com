require('dotenv').config();
const {GoogleGenerativeAI} = require("@google/generative-ai");
const { GoogleGenAI } = require("@google/genai");

const express = require("express");
const cors = require("cors")


const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }))

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


app.post('/api/visualize', async (req, res) => {
  try {
    console.log('--- REQUEST RECEIVED ---');
    console.log('API Key loaded:', !!process.env.GEMINI_API_KEY);
    console.log('Prompt preview:', req.body.prompt?.slice(0, 60));

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    console.log('Calling Gemini...');
    const result = await model.generateContent(prompt);
    console.log('Gemini responded!');

    const text = result.response.text();
    console.log('Gemini Responded! Text length:', text.length);

    res.json({ text });

  } catch (err) {
    console.error('--- SERVER ERROR ---');
    console.error('Name:', err.name);
    console.error('Message:', err.message);
    console.error('Status:', err.status);
    console.error('Details:', err?.errorDetails);
    console.error('Stack:', err.stack);
    res.status(500).json({ error: err.message || 'Unknown Error'});

  }
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const {
      productName, productDesc, productCategory, productTags,
      roomDesc, selectedColour, selectedSize,
      productImageBase64, productImageMimeType,
    } = req.body;

    const tagsStr = Array.isArray(productTags) ? productTags.join(', ') : (productTags || '');

    // ── Step 1: Get a precise visual description from the product image ──────
    let detailedVisualDesc = productDesc;
    if (productImageBase64) {
      const visionPrompt =
        `You are helping an AI image generator recreate this exact furniture piece inside a room scene. ` +
        `This is a "${productName}" — a ${productCategory || 'furniture'} piece with these characteristics: ${tagsStr}. ` +
        `Analyse the image carefully and describe it for precise reconstruction. Cover: ` +
        `(1) exact silhouette and proportions, ` +
        `(2) materials and textures visible (fabric weave, wood grain, metal finish, etc.), ` +
        `(3) colour and finish in plain language, ` +
        `(4) structural details — legs, joints, cushions, hardware, ` +
        `(5) any distinctive design details that make it recognisable. ` +
        `Be factual and specific. 4-5 sentences. No marketing language.`;

      const visualResult = await model.generateContent([
        { inlineData: { mimeType: productImageMimeType || 'image/webp', data: productImageBase64 } },
        visionPrompt,
      ]);
      detailedVisualDesc = visualResult.response.text();
    }

    // ── Step 2: Build the Imagen generation prompt ───────────────────────────
    const colourNote = selectedColour
      ? `The piece should be in a ${selectedColour} colourway/finish. `
      : '';
    const sizeNote = selectedSize && selectedSize !== 'Standard'
      ? `It is the ${selectedSize} size variant. `
      : '';

    const prompt =
      `High-end interior design editorial photograph for a Southeast Asian furniture brand. ` +
      `\n\nROOM: ${roomDesc}. ` +
      `\n\nFURNITURE HERO: A ${productName}${productCategory ? ` (${productCategory})` : ''}. ` +
      `${colourNote}${sizeNote}` +
      `It must look exactly like this — ${detailedVisualDesc} ` +
      `\n\nPHOTOGRAPHY DIRECTION: ` +
      `Eye-level or slight 3/4 angle with the ${productName} as the clear focal point of the frame. ` +
      `Natural soft light consistent with the described room. ` +
      `Clean, warm, minimalist Japandi-influenced Southeast Asian interior aesthetic — think Kinfolk magazine or Muji catalogue. ` +
      `Photorealistic, no CGI artifacts, no people, no text or watermarks. ` +
      `The furniture piece must be fully visible, true to its described material and proportions.`;

    const result = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: { numberOfImages: 1, aspectRatio: '16:9' },
    });

    const image = result.generatedImages[0].image;
    return res.json({ imageData: image.imageBytes, mimeType: 'image/png' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});


