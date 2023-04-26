import { Flex, rem, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
// import { Link } from "react-router-dom";
import { createStorage } from "@/util/storage";
import { UserInterfaceForm } from "@/components/core/CreateConfigByInterface/config";
const Storage = createStorage();

export const Navs = () => {
  const [experiments, setExperiments] = useState<UserInterfaceForm[]>();

  function setExperiment() {
    const res = Storage.get("experiments");
    if (res && res.length === 1) {
      Storage.set("currentNav", res[0].experimentName);
    }
    setExperiments(res);
  }

  useEffect(() => {
    setExperiment();
    window.addEventListener("storage", () => setExperiment());
  }, []);

  return (
    <Flex>
      {experiments?.map((experiment) => (
        <Nav
          name={experiment.experimentName}
          key={experiment.experimentName}
          // currentNav={document.title}
        ></Nav>
      ))}
    </Flex>
  );
};

const useNavStyles = createStyles((theme) => {
  return {
    roundedTop: {
      borderTopRightRadius: "3px",
      borderTopLeftRadius: "3px",
    },
    navContainer: {
      transition: "all 0.12s ease 0s",
    },
    nav: {
      color: "hsla(0,0%,100%,0.85)",
      "&:hover": {
        backgroundColor: "hsla(0,0%,0%,0.1)",
        color: "hsla(0,0%,100%,0.95)",
        borderTopRightRadius: "3px",
        borderTopLeftRadius: "3px",
      },
      "&:hover:before": {
        backgroundImage: "url(/fill_round.svg)",
      },
      "&:hover:after": {
        backgroundImage: "url(/fill_round.svg)",
      },
    },
    activeNavContainer: {
      backgroundColor: "white",
      color: "hsl(0,0%,30%)",
      "&::before,&::after": {
        content: "''",
        width: "3px",
        height: "3px",
        position: "absolute",
        bottom: 0,
      },
      "&::before": {
        left: "-3px",
        backgroundImage: "url(/left_round_white.svg)",
      },
      "&::after": {
        backgroundImage: "url(/right_round_white.svg)",
        right: "-3px",
      },
    },
    navLink: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      height: "100%",
      color: "inherit",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "32rem",
      cursor: "pointer",
    },
    activeNavLink: {
      paddingRight: rem(32),
      color: "#4D4D4D",
      fontWeight: 500,
    },
    truncate: {
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    shadow: {
      boxShadow: "rgb(0 0 0 / 8%) 0px 0px 2px, rgb(0 0 0 / 16%) 0px -1px 3px",
    },
    expandContainer: {
      position: "absolute",
      right: "12px",
      top: "0px",
      bottom: "0px",
      color: "rgba(46,47,50,0.75)",
    },
  };
});

export function Nav({
  name,
}: // currentNav,
{
  name: string;
  // currentNav: string;
}) {
  const { classes, cx } = useNavStyles();
  const [currentNav, setCurNav] = useState("");

  function setCurrentNav() {
    const res = Storage.get("currentNav");
    setCurNav(res);
  }

  useEffect(() => {
    setCurrentNav();
    window.addEventListener("storage", setCurrentNav);
  }, []);

  return (
    <Flex
      h={rem(32)}
      style={{
        cursor: "pointer",
        position: "relative",
        flex: "none",
      }}
    >
      <Flex
        className={cx(classes.navContainer, {
          [classes.nav]: currentNav !== name,
          [classes.roundedTop]: currentNav === name,
          [classes.activeNavContainer]: currentNav === name,
          [classes.shadow]: currentNav === name,
        })}
      >
        <div>
          <div
            onClick={() => (document.title = name)}
            className={cx(classes.navLink, {
              [classes.activeNavLink]: currentNav === name,
            })}
          >
            <span className={classes.truncate}>{name}</span>
          </div>
          <Flex align="center" className={classes.expandContainer}>
            {currentNav === name && <MdOutlineExpandMore />}
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
}
