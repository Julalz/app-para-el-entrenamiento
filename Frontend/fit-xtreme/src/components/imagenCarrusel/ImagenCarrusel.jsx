import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageCarousel() {
  return (
    <Carousel>
      <div>
        <img src="../../../public/images/background.png" alt="Image 1" />
      </div>
      <div>
        <img src="../../../public/images/background2.png" alt="Image 2" />
      </div>
      <div>
        <img src="../../../public/images/background3.png" alt="Image 3" />
      </div>
    </Carousel>
  );
}

export default ImageCarousel;
