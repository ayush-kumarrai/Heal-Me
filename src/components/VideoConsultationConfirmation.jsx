import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoConsultationConfirmation = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleTermsAcceptance = () => {
    setIsAccepted(!isAccepted);
  };

  const handleContinue = () => {
    if (isAccepted) {
      navigate('/video-consultation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Video Consultation Consent
        </h2>
        
        <div className="mb-6 text-gray-600">
          <p className="mb-4">
            By proceeding, you agree to share your video for the consultation. 
            Please review and accept the following terms:
          </p>
          
          <ul className="list-disc list-inside text-sm mb-4 text-gray-700">
            <li>Your video will be used solely for medical consultation</li>
            <li>All communication is confidential</li>
            <li>You can end the consultation at any time</li>
          </ul>
        </div>
        
        <div className="flex items-center mb-6">
          <input 
            type="checkbox" 
            id="terms-acceptance" 
            checked={isAccepted}
            onChange={handleTermsAcceptance}
            className="mr-3 text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          <label 
            htmlFor="terms-acceptance" 
            className="text-sm text-gray-700"
          >
            I accept the terms and conditions
          </label>
        </div>
        
        <button 
          onClick={handleContinue}
          disabled={!isAccepted}
          className={`w-full py-3 rounded-lg text-white transition duration-300 ${
            isAccepted 
              ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Consultation
        </button>
      </div>
    </div>
  );
};

export default VideoConsultationConfirmation;