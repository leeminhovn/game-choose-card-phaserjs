"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GameMainComponent = dynamic(
  () => import("@/components/initGame/InitGame"),
  { ssr: false }
);
export default function Home(props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token") || "";
    if (token.length > 0) {
      localStorage.setItem("token", token);
    }
  }, []);
  return (
    <>
      <audio id={"audio-element"} src={""} autoPlay />
      <GameMainComponent />
    </>
  );
}
export async function getServerSideProps(context) {
  return { props: {} };
}
