import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./Carousel.css";

const Carousel = ({ data = [], scale = 5 }) => {
  const [images, setImages] = useState([...data]);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [loadingImages, setLoadingImages] = useState(true);

  const carouselRef = useRef(null);
  const imagesRef = useRef(null);
  const counter = useRef(0);

  // prevent scrolling the whole page when user scrolls over the carousel
  useEffect(() => {
    const listener = (event) =>
      carouselRef.current &&
      event.target &&
      carouselRef.current.contains(event.target) &&
      event.preventDefault();

    document.addEventListener("wheel", listener, {
      capture: true,
      passive: false,
    });

    return () =>
      document.removeEventListener("wheel", listener, {
        capture: true,
        passive: false,
      });
  }, []);

  // updates the images sizes when screen resizes
  useEffect(() => {
    let timer;

    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setInnerHeight(window.innerHeight), 200);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  // ensures all images are loaded in the DOM before showing them
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= data.length) {
      setLoadingImages(false);
    }
  };

  const handleScroll = (event) => {
    if (imagesRef.current.offsetWidth <= carouselRef.current.offsetWidth)
      return;

    if (event.deltaY > 0) {
      images.unshift(images.pop());
      return setImages([...images]);
    }

    images.push(images.shift());
    setImages([...images]);
  };

  const renderImages = () =>
    images.map((image) => {
      const ratio = image.height / image.width;
      const width = innerHeight / ratio / scale;
      const height = innerHeight / scale;

      return (
        <img
          key={image.id}
          src={image.download_url}
          alt={image.author || "image"}
          style={{ width, height }}
          className={!loadingImages ? "image" : "image image-hidden"}
          onLoad={imageLoaded}
        />
      );
    });

  return (
    <div ref={carouselRef} className="carousel" onWheel={handleScroll}>
      {loadingImages && (
        <div className="loading">Loading Images in the DOM...</div>
      )}
      <div
        ref={imagesRef}
        className={!loadingImages ? "images" : "images images-hidden"}
        style={{
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
        }}
      >
        {renderImages()}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      url: PropTypes.string,
      download_url: PropTypes.string.isRequired,
    })
  ),
  scale: PropTypes.number, // the divisor
};

export default Carousel;
