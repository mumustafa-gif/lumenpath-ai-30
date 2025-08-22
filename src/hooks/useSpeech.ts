
import { useState, useRef, useCallback } from 'react';

interface UseSpeechOptions {
  onTranscription?: (text: string) => void;
  onSpeechEnd?: () => void;
  onSpeechStart?: () => void;
  onError?: (error: string) => void;
}

export const useSpeech = (options: UseSpeechOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      options.onError?.('Speech recognition not supported in this browser');
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      options.onSpeechStart?.();
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
        options.onTranscription?.(finalTranscript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      options.onSpeechEnd?.();
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      options.onError?.(event.error);
    };

    return recognition;
  }, [options]);

  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeSpeechRecognition();
    }
    
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.start();
    }
  }, [initializeSpeechRecognition, isListening]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Speak text using ElevenLabs or fallback to browser TTS
  const speak = useCallback(async (text: string, useElevenLabs: boolean = true) => {
    if (!text || !text.trim()) return;

    if (isSpeaking) {
      // Stop current speech
      if (speechSynthesisRef.current) {
        speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);

    if (useElevenLabs) {
      try {
        // Try ElevenLabs API first
        const response = await fetch('/functions/v1/text-to-speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            voice_id: 'EXAVITQu4vr4xnSDxMaL', // Sarah voice
            model_id: 'eleven_multilingual_v2'
          }),
        });

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          
          audio.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
          };
          
          audio.onerror = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
            // Fallback to browser TTS
            speakWithBrowserTTS(text);
          };
          
          await audio.play();
          return;
        }
      } catch (error) {
        console.error('ElevenLabs TTS error:', error);
      }
    }

    // Fallback to browser TTS
    speakWithBrowserTTS(text);
  }, [isSpeaking]);

  // Browser TTS fallback
  const speakWithBrowserTTS = useCallback((text: string) => {
    if (!text || !text.trim()) {
      setIsSpeaking(false);
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      // mark speaking at start for better UI feedback
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        // Silently handle speech synthesis errors
      };

      speechSynthesisRef.current = utterance;

      const assignPreferredVoice = () => {
        const voices = speechSynthesis.getVoices() || [];
        const preferred = voices.find(v => v.lang?.toLowerCase().includes('en')) || voices[0];
        if (preferred) {
          utterance.voice = preferred;
        }
      };

      const speakNow = () => {
        try {
          // clear any queued speech that might cause InvalidStateError
          speechSynthesis.cancel();
          speechSynthesis.speak(utterance);
        } catch (e) {
          setIsSpeaking(false);
          // Silently handle speech synthesis errors
        }
      };

      const voices = speechSynthesis.getVoices();
      if (!voices || voices.length === 0) {
        const handleVoices = () => {
          speechSynthesis.onvoiceschanged = null;
          assignPreferredVoice();
          speakNow();
        };
        speechSynthesis.onvoiceschanged = handleVoices;
        // Fallback if voiceschanged never fires
        setTimeout(() => {
          if (!speechSynthesis.speaking && speechSynthesisRef.current) {
            assignPreferredVoice();
            speakNow();
          }
        }, 300);
      } else {
        assignPreferredVoice();
        speakNow();
      }
    } else {
      setIsSpeaking(false);
      // Speech synthesis not supported
    }
  }, [options]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
};

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
