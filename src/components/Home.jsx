import React from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { usePrivy } from '@privy-io/react-auth';

const Home = () => {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const { login } = usePrivy();

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero bg-cover bg-center min-h-screen relative text-white py-8 sm:py-20 flex items-center" 
               style={{ backgroundImage: 'url(/back.webp)' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight"
            style={{ 
              fontFamily: '"Anton", sans-serif',
              fontSize: 'clamp(3rem, 19vw, 9rem)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            HEAL-ME
          </motion.h1>
          <motion.p
  className="text-2xl sm:text-lg md:text-2xl mt-4 px-2"
  style={{
    fontFamily: '"Ubuntu", sans-serif',
    fontWeight: 500,
    fontStyle: 'normal',
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
>
  Empowering Health with AI and Innovation
</motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button
              disableRipple
              className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-blue-700 text-white rounded-lg text-base sm:text-lg hover:bg-blue-800"
              size="lg"
              onPress={() => {
                handleConfetti();
                login();
              }}
            >
              Login and Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Feature sections with alternating backgrounds */}
      {[
        {
          title: "AI-Based Image Diagnosis",
          description: "Upload The picture of the disease visible and let our AI-based image diagnosis system analyze them for potential issues. The system detects abnormalities and provides insights to your doctor for quicker diagnosis and treatment.",
          image: "/ImageD.png",
          buttonText: "Diagnose Image",
          imageFirst: false
        },
        {
          title: "ML Lungs Cancer Predictor",
          description: "Our ML Disease Predictor uses advanced algorithms to analyze medical data and predict potential health risks. By simply uploading your medical information, you can get proactive health alerts and preventive suggestions, helping you take control of your well-being and stay healthy.",
          image: "/ml.png",
          buttonText: "Predict Now",
          imageFirst: true
        },
        {
          title: "Upload Medical Reports",
          description: "Upload your medical images, such as X-rays or MRIs, and our AI will analyze them for potential issues. Simply scan or upload reports, and our system will analyze them to offer valuable health insights, so you can take informed steps toward better health. Heal Me ensures confidentiality while leveraging AI to provide instant diagnoses and treatment plans.",
          image: "/upload.png",
          buttonText: "Upload Now",
          imageFirst: false
        },
        {
          title: "Video Consultations",
          description: "Engage in video consultations with healthcare professionals from the comfort of your home. Whether it's a routine check-up or specialized care, our platform allows you to discuss your concerns with doctors through secure video calls, saving you time and ensuring timely care.",
          image: "/video.png",
          buttonText: "Start Consultation",
          imageFirst: true
        }
      ].map((feature, index) => (
        <section 
          key={index} 
          className={`py-12 sm:py-16 ${
            index % 2 === 0 
              ? 'bg-blue-50' 
              : 'bg-white-100'
          } transition-colors duration-300`}
        >
          <div className={`container mx-auto px-4 flex flex-col ${feature.imageFirst ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-8`}>
            <motion.div
              className="text-center md:text-left md:w-1/2"
              initial={{ opacity: 0, x: feature.imageFirst ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{feature.title}</h2>
              <p className="text-base sm:text-lg mb-6 px-2 sm:px-0">
                {feature.description}
              </p>
              <motion.button
                className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-blue-700 text-white rounded-lg text-base sm:text-lg hover:bg-blue-800 transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                onClick={() => login()}
              >
                {feature.buttonText}
              </motion.button>
            </motion.div>
            <motion.img
              src={feature.image}
              alt={feature.title}
              className="w-full md:w-1/2 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: feature.imageFirst ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
        </section>
      ))}

      <footer className="bg-blue-100 text-center py-4 sm:py-6 px-4">
        <p className="text-sm sm:text-base">Made by Ayush &copy; 2024 Heal Me. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;