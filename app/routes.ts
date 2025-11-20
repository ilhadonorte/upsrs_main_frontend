import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("marca", "../pages/marcaPage/marcaPage.tsx"),
    route("fortesting", "routes/fortesting.tsx"),
    route("loginPage", "routes/loginPage.tsx"),
] satisfies RouteConfig;
