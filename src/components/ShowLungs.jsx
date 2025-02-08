import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ImagePlus, ClipboardList, ArrowRight } from 'lucide-react';

const ShowLungs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Top Design Element */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600" />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Heart className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Lung Health Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered analysis for accurate lung condition assessment
          </p>
        </div>

        {/* Options Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* MRI/CT Scan Option */}
          <button
            onClick={() => navigate('/diseasePredictor')}
            className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="absolute -top-6 left-8">
              <div className="bg-blue-600 p-4 rounded-xl shadow-lg">
                <ImagePlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start text-left pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Image Analysis
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Upload your MRI or CT scan images for comprehensive analysis using our state-of-the-art AI technology. Get detailed insights about potential conditions.
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                Start Analysis <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Basic Details Option */}
          <button
            onClick={() => navigate('/diseasePredictorImg')}
            className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="absolute -top-6 left-8">
              <div className="bg-blue-600 p-4 rounded-xl shadow-lg">
                <ClipboardList className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start text-left pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Symptom Assessment
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Complete a thorough questionnaire about your symptoms and medical history for a comprehensive preliminary evaluation.
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                Begin Assessment <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Professional Medical Tool
            </h3>
            <p className="text-blue-600">
              Our advanced system leverages cutting-edge machine learning technology to assist in identifying potential lung conditions. 
              While highly accurate, this tool is designed to support, not replace, professional medical diagnosis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowLungs;