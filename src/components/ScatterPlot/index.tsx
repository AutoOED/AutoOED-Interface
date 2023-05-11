import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { FC } from "react";

interface ScatterPlot {
  data: any[];
}

export const ScatterPlot: FC<ScatterPlot> = ({ data }) => {
  return (
    <ResponsiveScatterPlot
      data={data}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: 0, max: "auto" }}
      xFormat=">-.2f"
      yScale={{ type: "linear", min: 0, max: "auto" }}
      yFormat=">-.2f"
      blendMode="multiply"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "weight",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "size",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      tooltip={() => null}
      // tooltip={({ node }) => (
      //   <div style={{ padding: "10px" }}>
      //     <div>Class: {node.serieId}</div>
      //     <div>X: {node.formattedX}</div>
      //     <div>Y: {node.formattedY}</div>
      //     <div>Topic: {node.index}</div>
      //   </div>
      // )}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
