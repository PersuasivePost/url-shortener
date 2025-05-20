import React, { useState } from "react";
import "./Url.css";

const Shortener: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const createShortUrl = async () => {
    setCopied(false);
    try {
      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();
      if (data.shortUrl) {
        setShortUrl(`${window.location.origin}/${data.shortUrl}`);
      } else {
        alert("Failed to generate short URL.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="container">
      <h1>
        Generate a<br />
        <span>Short URL</span>
      </h1>
      <div className="display">
        <input
          type="text"
          placeholder="Short URL will appear here"
          value={shortUrl}
          readOnly
        />
        <img src="copy.png" alt="Copy" onClick={copyToClipboard} />
      </div>
      <input
        type="text"
        placeholder="Enter your original URL"
        className="url-input"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={createShortUrl}>
        <img src="/generate.png" alt="Generate" />
        Generate Short URL
      </button>
      {copied && <p style={{ marginTop: "10px", color: "#019f55" }}>Copied!</p>}
    </div>
  );
};

export default Shortener;
