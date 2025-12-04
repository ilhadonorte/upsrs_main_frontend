import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),
    index("../pages/loginPage/loginPage.tsx"),
    
    // route("marca", "../pages/marcaPage/marcaPage.tsx"),
    
    route("loginPage", "routes/loginPage.tsx"),
    

    route("agent", "../pages/agentPage/agentPage.tsx", [
        index("../pages/shopsPage/shopsPage.tsx"),
        route("marca", "../pages/marcaPage/marcaPage.tsx"),
        route("about", "../pages/aboutPage/aboutPage.tsx"),
        route("redux", "../pages/counterPage/counterPage.tsx"),
        route("ant", "routes/fortesting.tsx"),
    ]),
    
    // ...prefix("agent", [
    //     index("../pages/agentPage/agentPage.tsx"),
    //     route("marca", "../pages/marcaPage/marcaPage.tsx"),
    // ]),

    route("/*", "../pages/catchAllPage/catchAllPage.tsx")
] satisfies RouteConfig;
