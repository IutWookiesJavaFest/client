import React, { useEffect } from 'react';
import './CalendlyEmbed.css'
const CalendlyEmbed = () => {

  const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='calendly'>
      <h1>Set Meeting</h1>
      <div
        className="calendly-inline-widget"
        data-url= "https://calendly.com/tafsir-rahman"
      />
    </div>
  );
};

export default CalendlyEmbed;