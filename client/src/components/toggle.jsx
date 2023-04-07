import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AbsoluteCenter } from "@chakra-ui/react";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <AbsoluteCenter axis="both">
      <Button
        backgroundColor="transparent"
        _hover={{
          backgroundColor: "transparent",
          borderBottom: "2px solid grey",
          borderRadius: "0",
          transition: "0.1s ease-in",
        }}
        onClick={() => toggleColorMode()}
      >
        {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </AbsoluteCenter>
  );
};

export default ToggleColorMode;
