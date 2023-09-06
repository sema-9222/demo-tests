import { Carts } from "./Carts";
import colorIcon from "./colour.png";
import brainIcon from "./brain.png";
import continueIcon from "./continue.png";

export function Navigaton() {
  return (
    <div className="Navigation">
      <h1>TESTS</h1>
      <p>
        Here are some demo cognitive tests. There will be more tests available
        soon.
      </p>

      <div className="tests">
        <Carts
          name="Stroop Test"
          imageSrc={colorIcon}
          description="Test your reaction time"
          link="stroop"
        />
        <Carts
          name="Memory Test"
          imageSrc={brainIcon}
          description="Test your verbal memory"
          link="memory"
        />
        <Carts
          name="Under Construction"
          imageSrc={continueIcon}
          description="There will be new tests added"
          link=""
        />
      </div>
    </div>
  );
}
