import { VStack, Box, Heading, Divider } from "@chakra-ui/react";
import CourtListItem from "./court-list-item";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Virtual } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CourtList = () => {
  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const onChange = (value) => {
    setCurrentSlide(value);
  };

  useEffect(() => {
    async function fetchCourts() {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5001/basketball_courts");
        const data = await response.json();
        setCourts(data);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    }

    fetchCourts();
  }, []);

  return (
    <Box
      width={"100vw"}
      display="flex"
      margin={"auto"}
      marginTop="40px"
      justifyContent="center"
      padding={"20px"}
    >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
      >
        {courts.map((court, index) => (
          <SwiperSlide key={court.court_id}>
            <CourtListItem
              key={index}
              court={court}
              isCurrentSlide={index === currentSlide}
            ></CourtListItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CourtList;
