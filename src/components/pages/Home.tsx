import { BackgroundBeams } from "../ui/background-beams";
import HomeContent from "./HomeContent";

export function Home() {
  return (
    <div>
      <div className="z-50">
        <HomeContent />
      </div>
      <BackgroundBeams />
    </div>
  );
}
