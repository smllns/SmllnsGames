import { useRef, useEffect, useCallback } from 'react';
import { AudioOptions } from '@/lib/typesAndConstants';

//  Custom hook to manage audio playback with user interaction and enable/disable controls.
export const useAudio = (
  options: AudioOptions,
  enabled: boolean,
  hasInteracted: boolean
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the HTMLAudioElement for managing audio playback

  /**
   * Plays the audio if it is enabled and the user has interacted with the page.
   * Catches and logs any errors during playback, alerting the user if playback fails.
   */
  const playAudio = useCallback(() => {
    if (audioRef.current && enabled && hasInteracted) {
      audioRef.current.play().catch((error) => {
        console.error(`Error playing audio from ${options.src}:`, error);
        alert(
          `Failed to play audio. Please check the file '${options.src}' or try again.`
        );
      });
    }
  }, [enabled, hasInteracted, options.src]);

  // Pauses the audio and resets its current time to 0.
  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  /**
   * Initializes the audio element, sets up loop and volume, and handles initial playback
   * if enabled and user interaction has occurred. Cleans up on unmount.
   */
  useEffect(() => {
    const audio = new Audio(options.src);
    if (options.loop) audio.loop = true;
    if (options.volume) audio.volume = options.volume;
    audioRef.current = audio;

    if (enabled && hasInteracted) {
      playAudio();
    }

    return () => {
      pauseAudio();
      audioRef.current = null; // Clean up to prevent memory leaks
    };
  }, [
    options.src,
    options.loop,
    options.volume,
    enabled,
    hasInteracted,
    playAudio,
    pauseAudio,
  ]);

  /**
   * Manages audio playback state based on enabled flag and user interaction.
   * Plays or pauses audio when the enable state or interaction status changes.
   */
  useEffect(() => {
    if (hasInteracted) {
      if (enabled) {
        playAudio();
      } else {
        pauseAudio();
      }
    }
  }, [enabled, hasInteracted, playAudio, pauseAudio]);

  return { play: playAudio, pause: pauseAudio };
};
