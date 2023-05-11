import { Container, Flex, Group, Menu, createStyles, rem } from "@mantine/core";
import {
  MdOutlineDashboardCustomize,
  MdOutlineExpandMore,
} from "react-icons/md";
import { AiOutlineFileAdd, AiOutlinePlus } from "react-icons/ai";
import { useRef } from "react";
import { UserInterfaceModal, UserInterfaceModalHandle } from "@/components";
import { Navs } from "./nav";

const useLayoutTabStyles = createStyles((theme) => {
  const bgColor = theme.fn.rgba("#000000", 0.1);
  return {
    bar: {
      position: "relative",
      "&::before": {
        content: "''",
        display: "block",
        position: "absolute",
        height: rem(3),
        background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.16))",
        left: "0px",
        right: "0px",
        bottom: "0px",
      },
    },
    leftTabs: {
      backgroundColor: bgColor,
      position: "relative",
      flex: 1,
      // clipPath: "inset(-3px 0px 0px)",
    },
    rightTabs: {
      backgroundColor: bgColor,
      flex: "none",
      borderTopLeftRadius: "6px",
    },
    tabItem: {
      cursor: "pointer",
      "&:not(:first-of-type):before": {
        content: "''",
        height: "12px",
        width: "1px",
        backgroundColor: theme.fn.rgba("#ffffff", 0.15),
        display: "block",
        position: "relative",
        left: " 0px",
        top: "10px",
      },
    },
    tabItemText: {
      "&:hover": {
        color: "hsla(0,0%,100%,0.95);",
      },
    },
    round: {
      backgroundColor: bgColor,
      paddingLeft: "0.5rem",
      paddingRight: " 0.5rem",
      borderTopRightRadius: "6px",
    },
  };
});

export function LayoutTab() {
  const { classes, theme } = useLayoutTabStyles();
  const userInterfaceModalRef = useRef<UserInterfaceModalHandle>();

  function openUserInterfaceModal() {
    userInterfaceModalRef.current?.openModal();
  }

  return (
    <Container
      fluid
      p="0px"
      bg={theme.primaryColor}
      style={{ position: "relative" }}
    >
      <Flex h={rem(32)} className={classes.bar}>
        <Group className={classes.leftTabs}>
          <div
            style={{
              paddingLeft: theme.spacing.sm,
            }}
          >
            <Flex h={rem(32)} style={{ overflow: "auto" }}>
              <Navs />
              <Flex>
                <Flex className={classes.tabItem}>
                  <Flex
                    align="center"
                    px={theme.spacing.sm}
                    className={classes.tabItemText}
                  >
                    <MdOutlineExpandMore />
                  </Flex>
                </Flex>
                <Flex className={classes.tabItem}>
                  <Menu withArrow shadow="lg" width={200}>
                    <Menu.Target>
                      <Flex
                        align="center"
                        px={theme.spacing.sm}
                        className={classes.tabItemText}
                      >
                        <AiOutlinePlus style={{ paddingRight: "0.25rem" }} />
                        <div>Add or import</div>
                      </Flex>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>Create config by</Menu.Label>
                      <Menu.Item
                        onClick={openUserInterfaceModal}
                        icon={<MdOutlineDashboardCustomize />}
                      >
                        User interface
                      </Menu.Item>
                      <Menu.Item icon={<AiOutlineFileAdd />} disabled>
                        Loading from file
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
              </Flex>
            </Flex>
          </div>
        </Group>
        <div className={classes.round}></div>
        <Group ml="sm" className={classes.rightTabs}>
          <Flex h={rem(32)}>
            <Flex className={classes.tabItem}>
              <Flex
                align="center"
                px={theme.spacing.sm}
                className={classes.tabItemText}
              >
                <div>Extensions</div>
              </Flex>
            </Flex>
            <Flex className={classes.tabItem}>
              <Flex
                align="center"
                px={theme.spacing.sm}
                className={classes.tabItemText}
              >
                <div style={{ paddingRight: "0.25rem" }}>Tools</div>
                <MdOutlineExpandMore />
              </Flex>
            </Flex>
          </Flex>
        </Group>
      </Flex>

      <UserInterfaceModal ref={userInterfaceModalRef}></UserInterfaceModal>
    </Container>
  );
}
