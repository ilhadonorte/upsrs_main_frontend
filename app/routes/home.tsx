import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "UPSRS" },
    { name: "description", content: "UPSR CRUD module" },
  ];
}

export default function Home() {
  return <Welcome />;
}
