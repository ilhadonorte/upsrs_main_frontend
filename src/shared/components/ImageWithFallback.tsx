

import React, { useState } from 'react';

import {FALLBACK_IMAGE_URL} from "../../../shared/config"

const ImageWithFallback = ({ src, alt, fallbackSrc= FALLBACK_IMAGE_URL, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(fallbackSrc);
    console.warn(`ImageWithFallback component error: image failed to load: ${src}. \nWill used instead ${fallbackSrc}`);
  };

  return <img src={imageSrc} alt={alt} onError={handleError} {...props} />;
};

export default ImageWithFallback;