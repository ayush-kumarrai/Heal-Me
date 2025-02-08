import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

const ImageDiagnosis = () => {
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    
    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        setLoading(true);
        
        // Create object URL for displaying image
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        
        try {
          // Use FileReader to convert to base64
          const base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
  
          // Remove data URL prefix if present
          const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  
          // Send to backend
          const response = await axios.post('https://oauth-back.onrender.com/analyze', 
            { image: base64Data },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          
          setDiagnosis(response.data.diagnosis);
          setChat([{ role: 'system', content: `Initial diagnosis: ${response.data.diagnosis}` }]);
        } catch (error) {
          console.error('Error analyzing image:', error);
          setDiagnosis('Error analyzing image. Please try again.');
          
          // Log more detailed error information
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
          } else {
            // Something happened in setting up the request
            console.error('Error message:', error.message);
          }
        }
        setLoading(false);
      }
    };
  
    const handleSendMessage = async () => {
      if (!message.trim()) return;
      
      const userMessage = { role: 'user', content: message };
      setChat(prevChat => [...prevChat, userMessage]);
      setMessage('');
      
      try {
        const response = await axios.post('https://oauth-back.onrender.com/chat', {
          messages: [...chat, userMessage],
          diagnosis: diagnosis
        });
        
        setChat(prevChat => [...prevChat, { 
          role: 'assistant', 
          content: response.data.response 
        }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setChat(prevChat => [...prevChat, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }]);
      }
    };

    const formatContent = (text) => {
        return text
          .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Replace **text** with <b>text</b>
          .replace(/\n/g, '<br>'); // Replace newlines with <br> tags
      };

      const typeMessage = (message, callback) => {
        let index = 0;
        const interval = setInterval(() => {
          setChat(prevChat => {
            const newMessage = { role: 'assistant', content: message.slice(0, index + 1) };
            return [...prevChat.slice(0, -1), newMessage]; // Update the last message with the typing effect
          });
          index++;
          if (index === message.length) {
            clearInterval(interval);
            if (callback) callback(); // Call callback if provided (e.g., for diagnosis)
          }
        }, 50); // Adjust typing speed here (50ms per character)
      };
      
    
    
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
  <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
    {/* Upload Section */}
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-4">Medical Image Analysis</h2>
      <p className="text-gray-600 mb-6">
        Upload a medical image for AI-powered diagnosis and analysis
      </p>
      <button
        className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 py-3 shadow-xl bg-[#3498db] text-white
          after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-[#2980b9]
          after:z-[-1] after:transition after:duration-500 hover:after:scale-150 hover:after:opacity-0"
        onClick={() => fileInputRef.current.click()}
      >
        Upload Image
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>

    {/* Content Section */}
    <div className="space-y-8">
      {selectedImage && (
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={selectedImage} 
              alt="Uploaded medical" 
              className="w-full h-auto"
            />
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white">Analyzing image...</div>
              </div>
            )}
          </div>
          
          {diagnosis && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">AI Diagnosis</h3>
              <div 
                className="prose"
                dangerouslySetInnerHTML={{ __html: formatContent(diagnosis) }}
              />
            </div>
          )}
        </div>
      )}

      {diagnosis && (
        <div className="border rounded-lg">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'ml-auto bg-[#3498db] text-white' 
                    : 'bg-gray-100'
                }`}
                dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
              />
            ))}
          </div>
          
          <div className="border-t p-4 flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about the diagnosis..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:border-[#3498db]"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-[#3498db] text-white rounded-lg hover:bg-[#2980b9] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
    );
  };
  

export default ImageDiagnosis;