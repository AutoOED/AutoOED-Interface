import {
  Avatar,
  Container,
  Flex,
  Group,
  Header,
  createStyles,
  rem,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { BiHistory } from "react-icons/bi";
import { FiUsers, FiHelpCircle } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },
  logo: {
    marginRight: theme.spacing.md,
  },
  nav: {
    color: theme.fn.rgba("#ffffff", 0.95),
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "28px",
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    borderRadius: "9999px",
    transition: "background-color 0.12s ease 0s, box-shadow 0.12s ease 0s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },

  navActive: {
    boxShadow:
      "rgb(0 0 0 / 10%) 0px 0px 2px inset, rgb(0 0 0 / 10%) 0px 1px 1px inset",
    backgroundColor: "rgba(0, 0, 0, 0.15) !important",
  },

  navLight: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    height: "28px",
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    borderRadius: "9999px",
    backgroundColor: theme.fn.rgba("#ffffff", 0.95),
    color: theme.fn.primaryColor(),
    boxShadow:
      "0 0 1px rgb(0 0 0 / 32%), 0 0 2px rgb(0 0 0 / 8%), 0 1px 3px rgb(0 0 0 / 8%)",
  },
}));

const headers = ["Data"];

export function LayoutHeader() {
  const { pathname } = useLocation();
  const { classes, cx } = useStyles();
  return (
    <Header height={56} className={classes.header}>
      <Container fluid h="100%">
        <Flex justify="between" align="center" h="100%">
          <Group key="nav" style={{ minWidth: "400px", paddingLeft: "4px" }}>
            <Link to={pathname} className={classes.logo}>
              <img
                style={{ width: rem(120), objectFit: "cover" }}
                src="/logo_white.png"
                alt="AutoOED"
              />
            </Link>

            {headers.map((item) => (
              <Link
                key={item}
                to={pathname}
                className={cx(classes.nav, classes.navActive)}
              >
                <p>{item}</p>
              </Link>
            ))}
          </Group>
          <div style={{ flex: "1" }}></div>
          <Group key="user" spacing="md">
            <a className={classes.nav}>
              <BiHistory />
            </a>
            <a className={classes.nav}>
              <FiHelpCircle /> <span style={{ marginLeft: "4px" }}>Help</span>
            </a>
            <a className={classes.navLight}>
              <FiUsers /> <span style={{ marginLeft: "4px" }}>Share</span>
            </a>
            <a
              className={classes.navLight}
              style={{ width: "28px", padding: "0" }}
            >
              <IoMdNotificationsOutline />
            </a>
            <Avatar
              component="a"
              src="https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
              alt="user"
            />
          </Group>
        </Flex>
      </Container>
    </Header>
  );
}
