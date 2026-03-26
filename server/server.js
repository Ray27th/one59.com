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
        `You are analyzing this furniture piece for EXACT reconstruction in an AI-generated room scene. ` +
        `This is a "${productName}" — a ${productCategory || 'furniture'} piece. Tags: ${tagsStr}. ` +
        `\n\nAnalyze the image systematically and describe ONLY what you see. Be extremely specific about STRUCTURAL details:\n` +
        `\n**FRAME & SILHOUETTE:**\n` +
        `- Overall shape and proportions (width vs height vs depth ratio)\n` +
        `- Is it low-profile or tall? Compact or sprawling?\n` +
        `- Backrest style (straight, curved, tufted, slanted, winged)?\n` +
        `\n**LEGS & BASE:**\n` +
        `- Leg shape (tapered, hairpin, block, splayed, cabriole, cylindrical)?\n` +
        `- Leg material and finish (wood tone, metal color, painted)?\n` +
        `- How many legs and their exact placement (corner, center, pedestal)?\n` +
        `\n**MATERIALS & TEXTURES:**\n` +
        `- Primary material (fabric type, leather, wood, metal, rattan, etc.)\n` +
        `- Visible texture details (weave pattern, grain direction, brushed/smooth finish)\n` +
        `- Secondary materials (contrast stitching, metal accents, wood trim)?\n` +
        `\n**COLOR (be precise):**\n` +
        `- Primary color with shade (e.g., "charcoal grey" not just "grey")\n` +
        `- Any color variations or two-tone elements?\n` +
        `\n**STRUCTURAL DETAILS:**\n` +
        `- Cushion type (fixed, loose, pillow-top, channel-tufted)?\n` +
        `- Arm style (rolled, track, sloped, winged, armless)?\n` +
        `- Joinery visible (stitching lines, screws, welds, dowels)?\n` +
        `- Any distinctive features (nailhead trim, piping, carved details, cutouts)?\n` +
        `\n**DIMENSIONS CUES:**\n` +
        `- Approximate scale indicators (seat height, back height, arm height relative to each other)\n` +
        `\nWrite in plain, factual language. 8-12 sentences. No marketing fluff. Focus on what makes this piece structurally unique.`;

      const visualResult = await model.generateContent([
        { inlineData: { mimeType: productImageMimeType || 'image/webp', data: productImageBase64 } },
        visionPrompt,
      ]);
      detailedVisualDesc = visualResult.response.text();
      console.log('Vision Analysis Result:', detailedVisualDesc);
    }

    // ── Step 2: Build the Imagen generation prompt ───────────────────────────
    const colourNote = selectedColour
      ? `Color: The piece should be in a ${selectedColour} colourway/finish. `
      : '';
    const sizeNote = selectedSize && selectedSize !== 'Standard'
      ? `Size: It is the ${selectedSize} size variant. `
      : '';

    const prompt =
      `PHOTOREALISTIC INTERIOR PHOTOGRAPH. Professional furniture catalog shot for a Southeast Asian design brand.\n\n` +
      `SUBJECT: ${productName}${productCategory ? ` — ${productCategory}` : ''}. ` +
      `${colourNote}${sizeNote}\n` +
      `EXACT STRUCTURAL DETAILS (MUST FOLLOW PRECISELY):\n${detailedVisualDesc}\n\n` +
      `SETTING: ${roomDesc}.\n\n` +
      `COMPOSITION: ` +
      `The ${productName} must be the hero subject, positioned at eye-level or slight 3/4 angle. ` +
      `Full piece must be clearly visible — no cropping, no occlusion. ` +
      `Show the exact leg shape, material texture, and silhouette as described above.\n\n` +
      `LIGHTING: Natural soft light matching the room description. Gentle shadows for depth.\n\n` +
      `AESTHETIC: Clean, warm, minimalist Japandi-influenced Southeast Asian interior — Kinfolk magazine or Muji catalogue quality.\n\n` +
      `CRITICAL: ` +
      `Must be photorealistic with zero CGI appearance. ` +
      `No people, animals, text, logos, or watermarks. ` +
      `The furniture structure MUST match the detailed description exactly — especially legs, proportions, materials, and distinctive features. ` +
      `No creative reinterpretation of the furniture shape — replicate the described structure faithfully.`;

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


