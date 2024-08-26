import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const LinkGenerator: React.FC = () => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const generateTrackableLink = () => {
    if (newUrl.trim() === '') {
      message.error('Please enter a valid URL');
      return;
    }

    const id = uuidv4();
    const trackableUrl = `${window.location.origin}/track/${id}`;

    setGeneratedLink(trackableUrl);
    setNewUrl('');
    message.success('Trackable link generated successfully');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Link Generator</h1>
      <Input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        placeholder="Enter a URL to generate a trackable link"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <Button type="primary" onClick={generateTrackableLink}>
        Generate Link
      </Button>

      {generatedLink && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated Trackable Link:</h3>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkGenerator;
