import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { LayoutHeader } from "./header";
import { LayoutTab } from "./tabs";

export function Layout() {
  return (
    <AppShell header={<LayoutHeader />} padding={0}>
      <LayoutTab />
      <Outlet />
    </AppShell>
  );
}
