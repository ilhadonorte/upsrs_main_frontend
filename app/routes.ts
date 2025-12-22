import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),
    index("../src/pages/loginPage/loginPage.tsx"),
    

    // route("marca", "../pages/marcaPage/marcaPage.tsx"),
    
    // route("loginPage", "routes/loginPage.tsx"),
    

    route("agent", "../src/pages/agentPage/agentPage.tsx", [
        index("../src/pages/shopsPage/shopsPage.tsx"),
        route("marca", "../src/pages/marcaPage/marcaPage.tsx"),
        route("about", "../src/pages/aboutPage/aboutPage.tsx"),
        route("redux", "../src/pages/counterPage/counterPage.tsx"),
        route("ant", "routes/fortesting.tsx"),
    ]),
    
    // ...prefix("agent", [
    //     index("../pages/agentPage/agentPage.tsx"),
    //     route("marca", "../pages/marcaPage/marcaPage.tsx"),
    // ]),

    route("/*", "../src/pages/catchAllPage/catchAllPage.tsx")
] satisfies RouteConfig;
