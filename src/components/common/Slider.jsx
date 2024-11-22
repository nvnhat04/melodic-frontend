import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AlbumCard from "./AlbumCard.jsx";
import MerchandiseCard from "./MerchandiseCard.jsx";
import { Box } from "@mui/material";
import "swiper/swiper-bundle.css";

const AlbumSlider = ({ list, type }) => {
  const [slidesConfig, setSlidesConfig] = useState({
    slidesPerView: 7,
    slidesPerGroup: 7,
  });

  // Update slides configuration based on screen width
  const updateSlidesConfig = () => {
    if (window.innerWidth >= 960) {
      setSlidesConfig({ slidesPerView: 7, slidesPerGroup: 7 });
    } else if (window.innerWidth >= 600) {
      setSlidesConfig({ slidesPerView: 5, slidesPerGroup: 5 });
    } else {
      setSlidesConfig({ slidesPerView: 3, slidesPerGroup: 3 });
    }
  };

  useEffect(() => {
    updateSlidesConfig(); // Initial check
    window.addEventListener("resize", updateSlidesConfig); // Update on resize
    return () => window.removeEventListener("resize", updateSlidesConfig);
  }, []);

  return (
    <Box style={{ maxWidth: "100%" }}>
      <Swiper
        spaceBetween={1}
        slidesPerView={slidesConfig.slidesPerView}
        slidesPerGroup={slidesConfig.slidesPerGroup}
        grabCursor={true}
        direction="horizontal"
        observer={true}
      >
        {list.map((item) => (
          <SwiperSlide key={item.id}>
            {type === "Album" ? (
              <AlbumCard album={item} />
            ) : (
              <MerchandiseCard merchandise={item} hoverEffect={"blur"}/>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AlbumSlider;
