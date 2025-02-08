import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const Video = () => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = '';//USE YOUR OWN API KEY
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0F1cnJhX1NpbmciLCJ1c2VyX2lkIjoiQXVycmFfU2luZyIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzM5MDQwNjUxLCJleHAiOjE3Mzk2NDU0NTF9.bzVDO-W_2NfWYsy34Cu8bNHAiRyyj27hCtPGV_WD_C4';
    const userId = 'Aurra_Sing';
    const callId = 'OXripzhfosil';
    
    // https://getstream.io/chat/docs/react/token_generator/


    const user = {
      id: userId,
      name: '',
      image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
    };

    const newClient = new StreamVideoClient({ apiKey, user, token });
    const newCall = newClient.call('default', callId);
    
    newCall.join({ create: true });

    setClient(newClient);
    setCall(newCall);

    return () => {
      newCall.leave();
      newClient.disconnectUser();
    };
  }, []);

  const handleLeaveCall = () => {
    setShowLeaveConfirmation(true);
  };

  const confirmLeaveCall = async () => {
    try {
      if (call) {
        await call.leave();
      }
      if (client) {
        await client.disconnectUser();
      }
      navigate('/');
    } catch (error) {
      console.error('Error leaving call:', error);
      navigate('/');
    }
  };

  const cancelLeaveCall = () => {
    setShowLeaveConfirmation(false);
  };

  if (!client || !call) {
    return <div>Initializing video...</div>;
  }

  return (
    <>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout onLeaveCall={handleLeaveCall} />
        </StreamCall>
      </StreamVideo>

      {showLeaveConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Leave Call</h2>
            <p className="mb-4">Are you sure you want to leave the call?</p>
            <div className="flex justify-between">
              <button 
                onClick={confirmLeaveCall} 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Yes, Leave
              </button>
              <button 
                onClick={cancelLeaveCall} 
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MyUILayout = ({ onLeaveCall }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={onLeaveCall} />
    </StreamTheme>
  );
};

export default Video;