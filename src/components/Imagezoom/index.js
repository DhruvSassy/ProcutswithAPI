import React, { useRef, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

import './index.css'

const ImageZoom = ({products  }) => {
 
  const { images } = products;
  const [image, setImg] = useState(images?.[0] ?? "");
  const refs = useRef([]);
  const hoverHandler = (images1, i) => {
    setImg(images1);
    refs.current[i]?.classList?.add("active");
    for (var j = 0; j < images.length; j++) {
      if (i !== j) {
        refs.current[j]?.classList?.remove("active");
      }
    }
  };
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  const myComponent = {
    width: "115px",
    height: "350px",
    overflowY: "scroll",
    overflowX: "hidden",
  };

  return (
    <div
      className="container"
      style={{
        width: 1300,
        height: 950,
        marginLeft: "5%",
        margin: 10,
        display: "inline-block",
      }}
    >
      <div className="left">
        <div className="left_1" style={myComponent}>
          {images?.map((img, i) => (
            <div
              className={i === 0 ? "img_wrap active" : "img_wrap"}
              key={i}
              onMouseOver={() => hoverHandler(img, i)}
              ref={addRefs}
            >
              <img src={img} alt="ABCGD" />
            </div>
          ))}
        </div>
        <div className="left_2">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: image || images?.[0],
              },
              largeImage: {
                src: image || images?.[0],
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerDimensions: {
                width: "150%",
                height: "150%",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageZoom;
