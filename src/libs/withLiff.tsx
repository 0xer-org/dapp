import { ComponentType } from "react";
import { LiffProvider } from "react-liff";

const liffId = new URLSearchParams(window.location.search).get("liffId");

const withLiff = (Component: ComponentType) => () =>
  liffId ? (
    // @ts-expect-error liff provider type error
    <LiffProvider liffId={liffId}>
      <Component />
    </LiffProvider>
  ) : (
    <Component />
  );

export default withLiff;
