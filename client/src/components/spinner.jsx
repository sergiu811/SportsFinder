import { Spinner } from "@chakra-ui/react";

const CenteredSpinner = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "75vh",
    }}
  >
    <Spinner size="xl" color="blue.500" />
  </div>
);

export default CenteredSpinner;
