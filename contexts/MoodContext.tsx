import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the possible moods
export type Mood = 'happy' | 'neutral' | 'sad';

// Shape of the context value
interface MoodContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
}

// Create the context with undefined initial value
const MoodContext = createContext<MoodContextType | undefined>(undefined);

// Custom hook for accessing the mood context
export const useMood = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

// Provider component
export const MoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default mood is neutral
  const [mood, setMood] = useState<Mood>('neutral');

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
};
