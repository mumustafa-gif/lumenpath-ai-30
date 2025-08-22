import React, { useEffect, useRef, useState, useCallback } from 'react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
  VoiceEmotion,
  TaskMode,
} from '@heygen/streaming-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from 'lucide-react';

interface HeyGenAvatarProps {
  onAvatarSpeak?: (text: string) => void;
  onUserResponse?: (text: string) => void;
  avatarId?: string;
  voiceId?: string;
  className?: string;
}

const HeyGenAvatar: React.FC<HeyGenAvatarProps> = ({
  onAvatarSpeak,
  onUserResponse,
  avatarId = "Josh_20230207_20230207_sam",
  voiceId = "1bd001e7e50f421d891986aad5158bc8",
  className = ""
}) => {
  const [avatar, setAvatar] = useState<StreamingAvatar | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [debug, setDebug] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [text, setText] = useState<string>('');
  const [chatMode, setChatMode] = useState<TaskMode>(TaskMode.SYNC);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const mediaStream = useRef<HTMLVideoElement>(null);

  const handleSpeak = useCallback(async (text: string) => {
    if (!avatar || !text.trim()) return;
    
    setIsLoadingRepeat(true);
    try {
      await avatar.speak({
        text: text,
        task_type: TaskType.REPEAT
      });
      onAvatarSpeak?.(text);
    } catch (error) {
      console.error('Error speaking:', error);
    } finally {
      setIsLoadingRepeat(false);
    }
  }, [avatar, chatMode, onAvatarSpeak]);

  const startSession = useCallback(async () => {
    setIsLoadingSession(true);
    
    try {
      // Get HeyGen token from backend
      const tokenResponse = await fetch('/functions/v1/heygen-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get HeyGen token');
      }
      
      const { token } = await tokenResponse.json();
      
      const newAvatar = new StreamingAvatar({
        token: token,
      });

    try {
      const res = await newAvatar.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: avatarId,
        voice: {
          voiceId: voiceId,
          rate: 1.0,
          emotion: VoiceEmotion.EXCITED,
        },
        language: 'en',
      });

      setData(res);
      setAvatar(newAvatar);

      newAvatar.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
        console.log("Avatar started talking", e);
      });

      newAvatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
        console.log("Avatar stopped talking", e);
      });

      newAvatar.on(StreamingEvents.STREAM_READY, (event) => {
        console.log("Stream ready:", event.detail);
        setStream(event.detail);
      });

      newAvatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log("Stream disconnected");
        endSession();
      });

      newAvatar.on(StreamingEvents.USER_START, (event) => {
        console.log("User started talking:", event);
        setIsUserTalking(true);
      });

      newAvatar.on(StreamingEvents.USER_STOP, (event) => {
        console.log("User stopped talking:", event);
        setIsUserTalking(false);
        const transcript = event.detail?.transcript;
        if (transcript) {
          onUserResponse?.(transcript);
        }
      });

    } catch (error) {
      console.error("Error starting avatar session:", error);
      setDebug(`Error: ${error}`);
    } finally {
      setIsLoadingSession(false);
    }
  } catch (tokenError) {
    console.error("Error getting token:", tokenError);
    setDebug(`Token Error: ${tokenError}`);
    setIsLoadingSession(false);
  }
  }, [avatarId, voiceId, onUserResponse]);

  const endSession = useCallback(async () => {
    if (!avatar) return;
    
    try {
      await avatar.stopAvatar();
      setStream(null);
      setAvatar(null);
    } catch (error) {
      console.error("Error ending session:", error);
    }
  }, [avatar]);

  const handleInterrupt = useCallback(async () => {
    if (!avatar) return;
    
    try {
      await avatar.interrupt();
    } catch (error) {
      console.error("Error interrupting avatar:", error);
    }
  }, [avatar]);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing avatar stream");
      };
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <CardContent className="p-0 aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Video Stream */}
        <div className="relative w-full h-full">
          {stream ? (
            <video
              ref={mediaStream}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${!isVideoEnabled ? 'hidden' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-b from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <div className="text-4xl">👨🏽‍💼</div>
                </div>
                <div>
                  <p className="text-lg font-medium">Ahmed Al-Rashid</p>
                  <p className="text-sm text-gray-300">AI Interview Assistant</p>
                </div>
                {!avatar && (
                  <Button 
                    onClick={startSession}
                    disabled={isLoadingSession}
                    className="bg-ai-primary hover:bg-ai-primary/90"
                  >
                    {isLoadingSession ? 'Connecting...' : 'Start AI Interview'}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Avatar placeholder when video is disabled */}
          {!isVideoEnabled && avatar && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center text-white space-y-2">
                <div className="w-24 h-24 mx-auto bg-gradient-to-b from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <div className="text-4xl">👨🏽‍💼</div>
                </div>
                <p className="text-lg font-medium">Ahmed Al-Rashid</p>
                <p className="text-sm text-gray-300">Audio Only Mode</p>
              </div>
            </div>
          )}

          {/* Speaking Indicator */}
          {isUserTalking && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              You're speaking...
            </div>
          )}

          {/* Loading Indicator */}
          {isLoadingRepeat && (
            <div className="absolute top-4 right-4 bg-ai-primary text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              AI Responding...
            </div>
          )}

          {/* Control Bar */}
          {avatar && (
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
                onClick={handleInterrupt}
                disabled={!avatar}
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

              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Debug Info */}
        {debug && (
          <div className="absolute top-4 left-4 bg-black/70 text-white text-xs p-2 rounded max-w-xs">
            {debug}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HeyGenAvatar;