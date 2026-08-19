"use client";
import { useState, useEffect, useRef } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface CyberTextProps {
  text: string;
  className?: string;
  speed?: number;
  duration?: number;
}

export function CyberText({ text, className = "", speed = 30, duration = 500 }: CyberTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovering) {
      let iteration = 0;
      
      clearInterval(intervalRef.current as number);
      
      intervalRef.current = window.setInterval(() => {
        setDisplayText(currentText => 
          currentText.split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return LETTERS[Math.floor(Math.random() * LETTERS.length)];
            })
            .join("")
        );
        
        // Calculate iteration step based on duration and speed
        const maxIterations = duration / speed;
        iteration += text.length / maxIterations;
        
        if (iteration >= text.length) {
          clearInterval(intervalRef.current as number);
          setDisplayText(text);
        }
      }, speed);
    } else {
      clearInterval(intervalRef.current as number);
      setDisplayText(text);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovering, text, speed, duration]);

  return (
    <span 
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
}
