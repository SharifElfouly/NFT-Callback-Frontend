import { Box, HStack, useColorModeValue } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <HStack h={20} alignItems={"center"} justifyContent={"space-between"}>
        <HStack>
          <Box style={{ cursor: "pointer" }}>
            <div class="flex gap-2 justify-end">
              <div>Created By: </div>
              <a href="https://twitter.com/elfouly_sharif">
                <div class="text-blue-400">@elfouly_sharif</div>
              </a>
            </div>
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};
