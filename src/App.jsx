import { usePrivy } from '@privy-io/react-auth';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import CustomNavbarNot from './components/Navbar';
import CustomNavbar from './components/Navbar1';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import HomeLogin from './components/HomeLogin';
import MedicalReportAnalyzer from './components/MedicalReportAnalyzer';
import ImageDiagnosis from './components/ImageDiagnosis';
import Navbar4 from './components/Navbar4';
import HomeApp from './components/HomeApp';
import AppointmentList from './components/AppointmentList';
import BookAppointment from './components/BookAppointment';
import './App.css';
import PredictionForm from './components/PredictionForm';
import VideoConsultationConfirmation from './components/VideoConsultationConfirmation';
import VideoConsultationPage from './components/VideoConsultationPage';
import LungCancerGeminiAnalyzer from './components/LungCancerGeminiAnalyzer';
import ShowLungs from './components/ShowLungs';

function App() {
  const { ready, authenticated } = usePrivy();

  const unauthenticatedRouter = createBrowserRouter([
    {
      path: "/",
      element: <><CustomNavbarNot /><Home /></>
    },
    
  ]);

  const authenticatedRouter = createBrowserRouter([
    {
      path: "/",
      element: <><CustomNavbar /><HomeLogin /></>
    },
    {
      path: "/medicalReportAnalyser",
      element: <><CustomNavbar /><MedicalReportAnalyzer/></>
    },
    {
      path: "/imageDiagnosis",
      element: <><CustomNavbar /><ImageDiagnosis /></>
    },
    {
      path: "/appointment",
      element: <><CustomNavbar /><Navbar4 /><HomeApp /></>
    },
    {
      path: "/book",
      element: <><CustomNavbar /><Navbar4 /><BookAppointment/></>
    },
    {
      path: "/appointments",
      element: <><CustomNavbar /><Navbar4 /><AppointmentList/></>
    },
    {
      path: "/diseasePredictorImg",
      element: <><CustomNavbar /><PredictionForm/></>
    },
    {
      path: "/diseasePredictor",
      element: <><CustomNavbar /><LungCancerGeminiAnalyzer/></>
    },
    {
      path: "/showlungs",
      element: <><CustomNavbar /><ShowLungs/></>
    },
    {
      path: "/videoconsult",
      element: <><CustomNavbar /><VideoConsultationConfirmation/></>
    },
    {
      path: "/video-consultation",
      element: <><CustomNavbar /><VideoConsultationPage/></>
    },

  ]);
  if (!ready) return <LoadingSpinner />;

  const router = authenticated ? authenticatedRouter : unauthenticatedRouter;

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
