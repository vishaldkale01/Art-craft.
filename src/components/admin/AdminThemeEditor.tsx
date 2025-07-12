import React, { useState } from 'react';
import { getContrastYIQ } from '../utils/contrast';

export default function AdminThemeEditor() {
  const [bg, setBg] = useState('#18181b');
  const [text, setText] = useState(getContrastYIQ('#18181b'));

  // When background changes, auto-suggest text color
  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBg = e.target.value;
    setBg(newBg);
    setText(getContrastYIQ(newBg));
  };

  // Optionally, let admin override text color
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Custom Theme Editor</h2>
      <label style={{ display: 'block', marginBottom: 12 }}>
        Background Color:
        <input type="color" value={bg} onChange={handleBgChange} style={{ marginLeft: 12 }} />
      </label>
      <label style={{ display: 'block', marginBottom: 12 }}>
        Text Color:
        <input type="color" value={text} onChange={handleTextChange} style={{ marginLeft: 12 }} />
      </label>
      <div
        style={{
          background: bg,
          color: text,
          padding: 16,
          marginTop: 16,
          borderRadius: 8,
          border: '1px solid #ddd',
          textAlign: 'center',
        }}
      >
        Preview: This is how your theme will look.
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: '#888' }}>
        The text color is auto-suggested for best contrast, but you can override it.
      </div>
    </div>
  );
}
