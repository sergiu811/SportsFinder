import { DatePicker, Select } from "antd";
import { VStack, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

const LobbySelection = () => {
  const { selectedTime, setSelectedTime, setSelectedDate, selectedDate } =
    useGlobalContext();
  const [time_intervals, setTimeIntervals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setDate = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const setTime = (value) => {
    setSelectedTime(value);
  };
  useEffect(() => {
    async function fetchTimeInterval() {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5001/time_intervals");
        const data = await response.json();
        const options = data.map((option) => {
          return {
            value: option.time_id,
            label: option.time_interval,
          };
        });
        const currentHour = new Date().getHours();
        const newTimeIntervals = options.filter(
          (elem) => elem.label.slice(0, 2) > currentHour
        );
        setTimeIntervals(newTimeIntervals);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    }
    fetchTimeInterval();
  }, []);

  useEffect(() => {
    if (time_intervals.length > 0 && time_intervals !== undefined) {
      setSelectedTime(time_intervals[0].value);
    }
  }, [time_intervals]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <VStack width="100%">
      <Heading size={"sm"}>Select a date</Heading>
      <DatePicker
        defaultValue={dayjs(selectedDate, dateFormat)}
        size="large"
        style={{ width: "90%" }}
        onChange={setDate}
        clearIcon={false}
      />

      <Select
        size="large"
        onChange={setTime}
        style={{ width: "90%" }}
        defaultValue={time_intervals[0]}
        options={time_intervals}
      ></Select>
    </VStack>
  );
};
export default LobbySelection;
