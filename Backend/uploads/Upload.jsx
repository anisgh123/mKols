import React, { useState, useEffect } from 'react';

const ImageUploader = () => {
  const [imageURL, setImageURL] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const blobURL = URL.createObjectURL(file);
      setImageURL(blobURL);
    }
  };

  useEffect(() => {
    return () => {
      // Revoke the Blob URL when the component unmounts
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageURL && <img src={imageURL} alt="Uploaded Preview" />}
    </div>
  );
};

export default ImageUploader;
