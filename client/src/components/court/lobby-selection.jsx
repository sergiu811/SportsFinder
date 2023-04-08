import { DatePicker, Select } from "antd";
import { VStack, Heading } from "@chakra-ui/react";
import dayjs from "dayjs";
import moment from "moment";
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const options = [
  {
    value: 0,
    label: "8:00 to 10:00",
  },
  {
    value: 1,
    label: "10:00 to 12:00",
  },
  {
    value: 2,
    label: "12:00 to 14:00",
  },
  {
    value: 3,
    label: "14:00 to 16:00",
  },
  {
    value: 4,
    label: "16:00 to 18:00",
  },
  {
    value: 5,
    label: "18:00 to 20:00",
  },
  {
    value: 6,
    label: "20:00 to 22:00",
  },
];

const LobbySelection = () => {
  return (
    <VStack width="100%">
      <Heading size={"sm"}>Select a date</Heading>
      <DatePicker size="large" style={{ width: "90%" }} onChange={onChange} />

      <Select
        size="large"
        style={{ width: "90%" }}
        defaultValue={"Start Time to End Time"}
        options={options}
      ></Select>
    </VStack>
  );
};
export default LobbySelection;
