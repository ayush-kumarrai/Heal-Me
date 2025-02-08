const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const sharp = require('sharp');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function prepareImageForGemini(base64String) {
  try {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

    if (!base64Data.match(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/)) {
      throw new Error('Invalid base64 string format');
    }

    const imageBuffer = Buffer.from(base64Data, 'base64');

    const processedImage = await sharp(imageBuffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    return processedImage.toString('base64');
  } catch (error) {
    console.error('Image preparation error:', error);
    throw error;
  }
}

app.post('/analyze', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const processedImage = await prepareImageForGemini(image);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest" 
    });

    const prompt = `
      You are an advanced medical imaging AI assistant.
      Carefully analyze this medical image and provide a comprehensive diagnosis.
      Do not include these kind of message " I am an AI chatbot and cannot provide medical advice" or related to it.
      If there is anything other than disease or medical thing, then Write Somethng Like this does not belong to diagonis or medical thing
      Include:
      - Potential medical conditions or abnormalities
      - Key observations
      - Recommended next steps
      - Provide General Medicine For it.
      - A very small one line Disclaimer that this is an AI assessment and professional medical consultation is essential


    `;

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: processedImage
              }
            }
          ]
        }
      ]
    });

    const diagnosis = result.response.text();
    res.json({ diagnosis });

  } catch (error) {
    console.error('Comprehensive image analysis error:', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body
    });

    res.status(500).json({
      error: 'Error analyzing image',
      details: error.toString(),
      fullError: error.stack
    });
  }
});

app.post('/chat', async (req, res) => {
  try {
    const { messages, diagnosis } = req.body;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro" 
    });

    const chatHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const initialContext = `
      Context: A medical image has been diagnosed with the following initial assessment: 
      ${diagnosis}

      Please provide helpful, detailed, and compassionate responses to the user's questions 
      about this diagnosis. Maintain a supportive and informative tone.
    `;

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: initialContext }] }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      }
    });

    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    
    const result = await chat.sendMessage(lastUserMessage.content);
    const response = result.response.text();

    res.json({ response });

  } catch (error) {
    console.error('Chat error:', {
      message: error.message,
      stack: error.stack,
      requestBody: req.body
    });

    res.status(500).json({
      error: 'Error processing chat message',
      details: error.toString(),
      fullError: error.stack
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});