import { Container, JsonInput, rem } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const ViewLog = () => {
  const { ref, height } = useElementSize();
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const num = (height - 60) / 19;
    setRows(num <= 0 ? 1 : num);
  }, [height]);

  return (
    <Container
      ref={ref}
      bg="white"
      mx={0}
      w={rem(283)}
      px={0}
      style={{ display: "flex" }}
    >
      <div style={{ padding: `0 ${rem(24)}` }}>
        <JsonInput
          label="Logs"
          formatOnBlur
          autosize
          variant="filled"
          readOnly
          minRows={rows}
          maxRows={rows}
          style={{ flex: "1" }}
        />
      </div>
      <div
        style={{
          background: "rgba(77,77,77,0.3)",
          width: "1px",
          height: "100%",
        }}
      ></div>
    </Container>
  );
};
