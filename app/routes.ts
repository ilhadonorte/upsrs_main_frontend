import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),
    index("../pages/loginPage/loginPage.tsx"),
    
    // route("marca", "../pages/marcaPage/marcaPage.tsx"),
    route("fortesting", "routes/fortesting.tsx"),
    route("loginPage", "routes/loginPage.tsx"),
    route("counterpage", "../pages/counterPage/counterPage.tsx"),

    route("agent", "../pages/agentPage/agentPage.tsx", [
        index("../pages/shopsPage/shopsPage.tsx"),
        route("marca", "../pages/marcaPage/marcaPage.tsx"),
        route("about", "../pages/aboutPage/aboutPage.tsx"),
    ]),
    
    // ...prefix("agent", [
    //     index("../pages/agentPage/agentPage.tsx"),
    //     route("marca", "../pages/marcaPage/marcaPage.tsx"),
    // ]),

    route("/*", "../pages/catchAllPage/catchAllPage.tsx")
] satisfies RouteConfig;
