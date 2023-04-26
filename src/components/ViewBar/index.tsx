import {
  ActionIcon,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  RingProgress,
  ThemeIcon,
  createStyles,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import { BiCheck } from "react-icons/bi";
import { useInterval } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  viewBarContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    zIndex: 7,
    whiteSpace: "nowrap",
  },
}));

const IconObj = {
  stop: <VscDebugStart />,
  loading: <Loader />,
  start: <VscDebugStop />,
};

export const ViewBar = () => {
  const { classes, theme } = useStyles();
  const [status, setStatus] = useState<keyof typeof IconObj>("stop");

  return (
    <div>
      <Container
        fluid
        h={rem(44)}
        bg="white"
        className={classes.viewBarContainer}
      >
        <Flex align="center" ml={theme.spacing.xs}>
          <Button compact variant="light">
            Expreiment
          </Button>
          <Divider
            my={4}
            mx={theme.spacing.lg}
            orientation="vertical"
          ></Divider>
          <Button compact px={3}>
            Start Optimization
            <VscDebugStart style={{ color: theme.colors.teal }} />
          </Button>
        </Flex>
      </Container>
      <Divider my="undefind" />
    </div>
  );
};

export default ViewBar;
