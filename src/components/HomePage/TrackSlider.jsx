import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import "swiper/swiper-bundle.css";
import TrackCard from "./TrackCard";

const TrackSlider = ({ tracks }) => {
  const [slidesConfig, setSlidesConfig] = useState({
    slidesPerView: 1, // Mỗi slide hiển thị 1 cột dọc
    slidesPerGroup: 1,
  });

  // Update slides configuration based on screen width
  const updateSlidesConfig = () => {
    if (window.innerWidth >= 960) {
      setSlidesConfig({ slidesPerView: 2, slidesPerGroup: 1 }); // Mỗi slide 1 cột dọc
    }
    if (window.innerWidth < 960) {
      setSlidesConfig({ slidesPerView: 1, slidesPerGroup: 1 }); // Vẫn giữ mỗi slide 1 cột dọc
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
        spaceBetween={5}  // Khoảng cách giữa các slide
        slidesPerView={slidesConfig.slidesPerView}
        slidesPerGroup={slidesConfig.slidesPerGroup}
        grabCursor={true}
        direction="horizontal"
        observer={true}
      >
        {/* Chia các bài hát thành nhóm 4 bài cho mỗi slide */}
        {Array.from({ length: Math.ceil(tracks.length / 4) }, (_, index) => {
          const trackGroup = tracks.slice(index * 4, index * 4 + 4);
          return (
            <SwiperSlide key={index}>
              <Box>
                {trackGroup.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default TrackSlider;
