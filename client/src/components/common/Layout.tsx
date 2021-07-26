import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../SideBar";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
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
