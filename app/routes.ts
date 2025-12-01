import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),
    index("../pages/loginPage/loginPage.tsx"),
    route("about", "../pages/aboutPage/aboutPage.tsx"),
    route("marca", "../pages/marcaPage/marcaPage.tsx"),
    route("fortesting", "routes/fortesting.tsx"),
    route("loginPage", "routes/loginPage.tsx"),
    route("counterpage", "../pages/counterPage/counterPage.tsx"),
    route("/*", "../pages/catchAllPage/catchAllPage.tsx")
] satisfies RouteConfig;
