import React, { useState } from 'react';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl })
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🔗 Mini URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={{ width: '300px', padding: '8px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px 12px' }}>
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <strong>Shortened URL:</strong> <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;