import { Box, Heading, Spinner, Text } from "../../common/chakra-ui";

export default function Loading() {
  return (
    <Box justifyContent="center" display="flex">
      <Spinner color="tale.400" size="xl" />
      <Heading>Now validating...</Heading>
      <Text>You will be redirected soon...</Text>
    </Box>
  );
}
