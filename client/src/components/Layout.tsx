import { Box, Grid, GridItem } from "@chakra-ui/layout";
import SideBar from "./SideBar";
interface Props {
  children: JSX.Element;
}
export default function Layout({ children }: Props) {
  return (
    <Box
      style={{
        minHeight: "90vh",
      }}
      px="4"
    >
      <Grid templateColumns="repeat(4, 1fr)" rows={1} columnGap="4">
        <GridItem>
          <SideBar />
        </GridItem>
        <GridItem colSpan={3}>{children}</GridItem>
      </Grid>
    </Box>
  );
}
