import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface MockHeyGenAvatarProps {
  onAvatarSpeak?: (text: string) => void;
  onUserResponse?: (text: string) => void;
  onSessionReady?: () => void;
  currentQuestion?: string;
  isInterviewActive?: boolean;
  avatarId?: string;
  voiceId?: string;
  className?: string;
}

const MockHeyGenAvatar: React.FC<MockHeyGenAvatarProps> = ({
  onAvatarSpeak,
  onUserResponse,
  onSessionReady,
  currentQuestion,
  isInterviewActive = false,
  className = ""
}) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [currentSpeechText, setCurrentSpeechText] = useState('');
  const [lastQuestionAsked, setLastQuestionAsked] = useState<string>('');
  const [avatarMoodState, setAvatarMoodState] = useState<'idle' | 'speaking' | 'listening'>('idle');
  const [eyeBlinkAnimation, setEyeBlinkAnimation] = useState(false);
  const [mouthMovement, setMouthMovement] = useState(false);

  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock responses for realistic interaction
  const mockResponses = [
    "That's an excellent question. Let me think about that for a moment.",
    "I can hear you clearly. Please continue with your answer.",
    "Interesting perspective. Can you elaborate on that point?",
    "Good answer. Let's move on to the next question.",
    "I appreciate your detailed response. Thank you."
  ];

  // Realistic avatar speech simulation
  const handleSpeak = useCallback(async (text: string) => {
    if (!text.trim() || !isSessionActive) return;
    
    setCurrentSpeechText(text);
    setIsAvatarSpeaking(true);
    setAvatarMoodState('speaking');
    setMouthMovement(true);
    
    // Calculate realistic speaking duration (150 words per minute average)
    const wordCount = text.split(' ').length;
    const speakingDuration = Math.max((wordCount / 150) * 60 * 1000, 3000); // Minimum 3 seconds
    
    onAvatarSpeak?.(text);
    setLastQuestionAsked(text);

    // Simulate mouth movement during speech
    const mouthInterval = setInterval(() => {
      setMouthMovement(prev => !prev);
    }, 200);

    speechTimeoutRef.current = setTimeout(() => {
      setIsAvatarSpeaking(false);
      setAvatarMoodState('listening');
      setMouthMovement(false);
      setCurrentSpeechText('');
      clearInterval(mouthInterval);
    }, speakingDuration);
  }, [isSessionActive, onAvatarSpeak]);

  // Eye blinking animation
  useEffect(() => {
    if (isSessionActive) {
      blinkIntervalRef.current = setInterval(() => {
        setEyeBlinkAnimation(true);
        setTimeout(() => setEyeBlinkAnimation(false), 150);
      }, Math.random() * 4000 + 2000); // Random blink every 2-6 seconds
    }

    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [isSessionActive]);

  // Manual question asking - only when user clicks speak button
  const askCurrentQuestion = useCallback(() => {
    if (isSessionActive && currentQuestion && isInterviewActive) {
      const questionText = `Hello, I'm Ahmed, your AI interview assistant. Here's your question: ${currentQuestion}. Please take your time to answer.`;
      handleSpeak(questionText);
    }
  }, [currentQuestion, isSessionActive, isInterviewActive, handleSpeak]);

  const startSession = useCallback(async () => {
    setIsLoadingSession(true);
    
    // Simulate connection time
    setTimeout(() => {
      setIsSessionActive(true);
      setSessionReady(true);
      setIsLoadingSession(false);
      setAvatarMoodState('idle');
      onSessionReady?.();
      
      // Welcome message - don't auto-speak, wait for user to click speaker
      // User will manually trigger question by clicking the speaker button
    }, 2000);
  }, [onSessionReady, handleSpeak]);

  const endSession = useCallback(() => {
    setIsSessionActive(false);
    setSessionReady(false);
    setIsAvatarSpeaking(false);
    setIsUserTalking(false);
    setAvatarMoodState('idle');
    setCurrentSpeechText('');
    
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    if (listeningTimeoutRef.current) {
      clearTimeout(listeningTimeoutRef.current);
    }
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
    }
  }, []);

  const simulateUserSpeaking = useCallback(() => {
    if (!isSessionActive || isAvatarSpeaking) return;
    
    setIsUserTalking(true);
    setAvatarMoodState('listening');
    
    // Simulate user speaking for 3-8 seconds
    const speakingDuration = Math.random() * 5000 + 3000;
    
    listeningTimeoutRef.current = setTimeout(() => {
      setIsUserTalking(false);
      setAvatarMoodState('idle');
      
      // Generate a mock user response
      const mockUserResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      onUserResponse?.(mockUserResponse);
      
      // Avatar provides acknowledgment
      setTimeout(() => {
        const acknowledgments = [
          "Thank you for that response.",
          "I understand your perspective.",
          "That's a thoughtful answer.",
          "Good point. Let's continue."
        ];
        const ack = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
        handleSpeak(ack);
      }, 1000);
    }, speakingDuration);
  }, [isSessionActive, isAvatarSpeaking, onUserResponse, handleSpeak]);

  const handleInterrupt = useCallback(() => {
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    if (listeningTimeoutRef.current) {
      clearTimeout(listeningTimeoutRef.current);
    }
    setIsAvatarSpeaking(false);
    setIsUserTalking(false);
    setAvatarMoodState('idle');
    setCurrentSpeechText('');
    setMouthMovement(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <CardContent className="p-0 aspect-video bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="relative w-full h-full">
          {isSessionActive ? (
            <div className="w-full h-full flex items-center justify-center">
              {/* Animated Avatar */}
              <div className="relative">
                {/* Avatar Background Glow */}
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isAvatarSpeaking ? 'bg-blue-500/30 scale-110' : 
                  avatarMoodState === 'listening' ? 'bg-green-500/20 scale-105' :
                  'bg-blue-400/10 scale-100'
                } blur-xl`} />
                
                {/* Main Avatar */}
                <div className={`relative w-32 h-32 mx-auto transition-all duration-300 ${
                  isAvatarSpeaking ? 'scale-105' : 
                  avatarMoodState === 'listening' ? 'scale-102' :
                  'scale-100'
                }`}>
                  {/* Face */}
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-lg border-4 border-white/20 relative overflow-hidden">
                    {/* Eyes */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                      <div className={`w-3 h-3 bg-gray-800 rounded-full transition-all duration-150 ${
                        eyeBlinkAnimation ? 'scale-y-10' : 'scale-y-100'
                      }`} />
                      <div className={`w-3 h-3 bg-gray-800 rounded-full transition-all duration-150 ${
                        eyeBlinkAnimation ? 'scale-y-10' : 'scale-y-100'
                      }`} />
                    </div>
                    
                    {/* Mouth */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                      <div className={`transition-all duration-200 ${
                        mouthMovement && isAvatarSpeaking ? 
                        'w-4 h-3 bg-gray-700 rounded-full' :
                        'w-6 h-1 bg-gray-600 rounded-full'
                      }`} />
                    </div>

                    {/* Facial Features */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-600 rounded-full" />
                  </div>
                  
                  {/* Professional Attire Suggestion */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg" />
                </div>

                {/* Name and Title */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-lg font-medium text-white">Ahmed Al-Rashid</p>
                  <p className="text-sm text-blue-200">AI Interview Assistant</p>
                  <div className={`text-xs px-3 py-1 rounded-full inline-block transition-all duration-300 ${
                    isAvatarSpeaking ? 'bg-blue-500/80 text-white' :
                    avatarMoodState === 'listening' ? 'bg-green-500/80 text-white' :
                    'bg-gray-500/50 text-gray-200'
                  }`}>
                    {isAvatarSpeaking ? 'Speaking...' :
                     avatarMoodState === 'listening' ? 'Listening...' :
                     'Ready'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-b from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-4xl">👨🏽‍💼</div>
                </div>
                <div>
                  <p className="text-lg font-medium">Ahmed Al-Rashid</p>
                  <p className="text-sm text-gray-300">AI Interview Assistant</p>
                </div>
                <Button 
                  onClick={startSession}
                  disabled={isLoadingSession}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  {isLoadingSession ? 'Connecting...' : 'Start AI Interview'}
                </Button>
              </div>
            </div>
          )}

          {/* Speaking Indicators */}
          {isUserTalking && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse flex items-center gap-2">
              <Mic className="w-3 h-3" />
              You're speaking...
            </div>
          )}

          {isAvatarSpeaking && (
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse flex items-center gap-2">
              <Volume2 className="w-3 h-3" />
              AI Speaking...
            </div>
          )}

          {/* Session Status */}
          {sessionReady && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Connected
            </div>
          )}

          {/* Current Speech Text */}
          {currentSpeechText && (
            <div className="absolute bottom-20 left-4 right-4 bg-black/80 backdrop-blur text-white text-sm p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Volume2 className="w-3 h-3" />
                <span className="font-medium">Ahmed:</span>
              </div>
              <p>{currentSpeechText}</p>
            </div>
          )}

          {/* Control Bar */}
          {isSessionActive && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur rounded-lg px-4 py-2">
              <Button
                size="sm"
                variant={isMuted ? "destructive" : "secondary"}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              
              <Button
                size="sm"
                variant={isVideoEnabled ? "secondary" : "outline"}
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              >
                {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={simulateUserSpeaking}
                disabled={isAvatarSpeaking || isUserTalking}
                title="Simulate speaking (for demo)"
              >
                <Mic className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={askCurrentQuestion}
                disabled={isAvatarSpeaking || !currentQuestion}
                title="Ask current question"
              >
                <Volume2 className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleInterrupt}
              >
                Stop
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={endSession}
              >
                End Session
              </Button>

              <div className={`w-3 h-3 rounded-full ${
                isAvatarSpeaking ? 'bg-blue-500' :
                avatarMoodState === 'listening' ? 'bg-green-500' :
                'bg-gray-500'
              } animate-pulse`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MockHeyGenAvatar;