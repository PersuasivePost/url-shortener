import React, { useState } from "react";
import "./Shortener.css";

interface ShortUrlResponse {
  shortUrl: string;
  originalUrl: string;
  expireAt: Date;
}

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiryDays, setExpiryDays] = useState(0);
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl,
          expiryDays: expiryDays || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data: ShortUrlResponse = await response.json();
      setShortUrl(victorious-curiosity-production-f165.up.railway.app`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container">
      <h1>
        Shorten Your
        <br />
        <span>Long URL</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your long URL"
            required
          />
        </div>

        <div className="input-group">
          <label>Expiry Days (0 for never expire):</label>
          <input
            type="number"
            min="0"
            value={expiryDays}
            onChange={(e) => setExpiryDays(parseInt(e.target.value) || 0)}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            "Shortening..."
          ) : (
            <>
              <img src="/generate.png" alt="Generate" />
              Shorten URL
            </>
          )}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="display">
          <input type="text" value={shortUrl} readOnly />
          <img
            src="/copy.png"
            onClick={copyToClipboard}
            alt="Copy"
            className="copy-icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;
