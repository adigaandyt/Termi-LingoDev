

import React, { useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import '../styles/TestComponent.css'
function TestComponent() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const imageRef = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (image) {
      const cropper = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
      });

      return () => {
        cropper.destroy();
      };
    }
  }, [image]);

  const handleCrop = () => {
    const croppedCanvas = imageRef.current.cropper.getCroppedCanvas();
    setImage(croppedCanvas.toDataURL());
  };
    return (<>

<div>
      <input type="file" onChange={handleFileChange} />
      {image && (
        <>
          <div>
            <img ref={imageRef} src={image} alt="Original image" />
          </div>
          <button onClick={handleCrop}>Crop</button>
        </>
      )}
    </div>
    </>)}



export default TestComponent;
