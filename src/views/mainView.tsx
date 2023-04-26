import { Container, Flex, SegmentedControl, createStyles } from "@mantine/core";
import { Radar, ScatterPlot, ViewBar, ViewLog } from "@/components";
import { radarData, scatterData } from "./data";
import { useEffect, useState } from "react";
import { UserInterfaceForm } from "@/components/core/CreateConfigByInterface/config";
import { randomNormal } from "d3-random";
import { createStorage } from "@/util/storage";

const Storage = createStorage();

const useStyles = createStyles((theme) => ({
  viewContainer: {
    overflow: "hidden",
    height: "100%",
    background: "#f5f5f5",
    position: "relative",
  },
}));

const MainView: React.FC = () => {
  const { classes, theme } = useStyles();
  const [experiments, setExperiments] = useState<UserInterfaceForm[]>();
  const [data, setData] = useState<any[]>([]);
  const [currentNav, setCurrentNav] = useState("");

  useEffect(() => {
    setExperiments(Storage.get("experiments") || []);
    setCurrentNav(Storage.get("currentNav") || "");
    window.addEventListener("changeStorage", () => {
      const data = Storage.get("experiments");
      const nav = Storage.get("currentNav");
      setExperiments(data || []);
      setCurrentNav(nav || "");
    });

    setPlotData();
  }, []);

  function setPlotData() {
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

    setData(data);
  }

  useEffect(() => {
    setPlotData();
  }, [currentNav]);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    // Train the LDA model
    const docs: any[] = [];
    data.forEach((d) => {
      d.data.forEach((point: { x: any; y: any }) => {
        docs.push([point.x, point.y]);
      });
    });

    // const lda = new LDA(docs, 2);
    // // Classify the data points
    // const classifiedData = data.map((d) => ({
    //   ...d,
    //   data: d.data.map((point: { x: any; y: any }) => {
    //     const topic = lda.classify([point.x, point.y]);

    //     return {
    //       ...point,
    //       topic,
    //     };
    //   }),
    // }));

    // setData(classifiedData);
  }, [data]);

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
            <ScatterPlot data={data}></ScatterPlot>
            <Radar data={radarData}></Radar>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};

export default MainView;
