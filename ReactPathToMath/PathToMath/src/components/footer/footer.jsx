import React, { useEffect, useState } from 'react';

const slogans = [
  "Every problem has a solution — find it!",
  "Every problem you solve makes you stronger.",
  "Challenge accepted: let's solve it!",
  "Mistakes help us grow — keep solving!",
  "Practice makes Perfect - keep at it!",
  "Mistakes are proof you're trying — never stop learning!",
];

function Footer() {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        setFade(true); // Start fade-in
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-orange-300 border-t-4 border-orange-500 text-white text-center py-1 shadow-xl playful-font">
      <p className={`text-lg px-4 flex items-center justify-center gap-3 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/90 text-yellow-500 shadow-md text-sm">
        💡
        </span>
        {slogans[currentSloganIndex]}
      </p>
    </footer>
  );
}
export default Footer;