import { Container, Flex, SegmentedControl, createStyles } from "@mantine/core";
import { Radar, ScatterPlot, ViewBar, ViewLog } from "@/components";
import { radarData } from "./data";
import { useEffect, useState } from "react";
import { UserInterfaceForm } from "@/components/core/CreateConfigByInterface/config";
import { randomNormal } from "d3-random";
import { createStorage } from "@/util/storage";
import { useRequest } from "ahooks";
import axios from "axios";

const Storage = createStorage();

const useStyles = createStyles((theme) => ({
  viewContainer: {
    overflow: "hidden",
    height: "100%",
    background: "#f5f5f5",
    position: "relative",
  },
}));

function handleCreateExp(data: UserInterfaceForm) {
  return axios.post("/api/exp/create", data);
}

const MainView: React.FC = () => {
  const { classes } = useStyles();
  const [experiments, setExperiments] = useState<UserInterfaceForm[]>();
  const [plotData, setPlotData] = useState<unknown[]>([]);
  const [currentNav, setCurrentNav] = useState("");

  const { data, run } = useRequest(handleCreateExp, {
    manual: true,
  });

  // useEffect(() => {
  //   console.log("error", error);
  // }, [error]);

  useEffect(() => {
    if (currentNav && experiments) {
      handleGetPlotData();
      const index = experiments.findIndex(
        (v) => v.experimentName === currentNav
      );

      if (index > -1) {
        console.log("experiments", experiments);
        experiments && run(experiments[index]);
      }
    }
  }, [currentNav, experiments, run]);

  useEffect(() => {
    setExperiments(Storage.get("experiments") || []);
    setCurrentNav(Storage.get("currentNav") || "");
    window.addEventListener("changeStorage", () => {
      const data = Storage.get("experiments");
      const nav = Storage.get("currentNav");
      setExperiments(data || []);
      setCurrentNav(nav || "");
    });

    handleGetPlotData();
  }, []);

  function handleGetPlotData() {
    const randomX = randomNormal(0.5, 0.1);
    const randomY = randomNormal(0.5, 0.1);
    const classA = Array.from({ length: 50 }, () => ({
      x: randomX(),
      y: randomY(),
    }));
    const classB = Array.from({ length: 50 }, () => ({
      x: randomX(),
      y: randomY(),
    }));

    // Combine data into a single dataset
    const data = [
      { id: "class A", data: classA },
      { id: "class B", data: classB },
    ];

    console.log("data", data);

    setPlotData(data);
  }

  if (experiments?.length === 0) {
    return <div></div>;
  }

  return (
    <Flex direction="column" style={{ height: "calc(100vh - 88px)" }}>
      <ViewBar />
      <Flex bg="#f5f5f5" className={classes.viewContainer}>
        <ViewLog></ViewLog>
        <Container bg="white" maw="100%" w="100%">
          <Flex justify="center">
            <SegmentedControl
              data={[
                { label: "Visualization", value: "Visualization" },
                { label: "Statistics", value: "Statistics" },
                { label: "Database", value: "Database" },
              ]}
            />
          </Flex>
          <Flex justify="space-around" style={{ flex: "1", height: "100%" }}>
            <ScatterPlot data={plotData}></ScatterPlot>
            <Radar data={radarData}></Radar>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default MainView;
