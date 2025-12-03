import { Link } from "react-router";

import { WeatherVidget } from "shared/Weather";

export default function About() {
  return (
    <main className="flex items-center justify-center pt-8 pb-2">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-2">
            <h1>About Page</h1>
            <Link to="/">◀ Back</Link> <br></br>
            <hr></hr>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          </div>
        </header>
    
    <WeatherVidget></WeatherVidget>
      
      </div>
    </main>
  );
}   