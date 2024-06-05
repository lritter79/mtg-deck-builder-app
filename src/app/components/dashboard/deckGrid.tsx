"use client";
import { useTrail, animated } from "react-spring";
import BlackContainer from "../utilities/BlackContainer";
import Tooltip from "../utilities/Tooltip";
import Link from "next/link";

const DeckGrid: React.FC<{
  decks: {
    commander_id: string | null;
    deck_format: number;
    fork_id: number | null;
    id: number;
    name: string | null;
    notes: string | null;
    oathbreaker_id: string | null;
    signature_spell_id: string | null;
    user_id: string | null;
  }[];
}> = ({ decks }) => {
  // Wrap the decks mapping with the fade-in animation
  // Wrap the decks mapping with the fade-in animation
  const trail = useTrail(decks.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    rotateX: 0,
    from: { opacity: 0, rotateX: 90 },
  });

  return (
    <div className="p-8">
      {/* ... (existing code) */}
      <div className="grid grid-cols-3 gap-4">
        {trail.map((props, index) => {
          const rotationX = props.rotateX.to(
            (rotateX) => `rotateX(${rotateX}deg)`
          );
          return (
            <animated.div
              key={decks[index].id}
              style={{
                ...props,
                transform: `${rotationX}`,
              }}
            >
              <BlackContainer>
                <div className="text-center">
                  <Tooltip text={`${decks[index].notes}`}>
                    <Link
                      className="text-lg text-white font-bold mb-2 hover:underline"
                      href={`/decks/${decks[index].id}`}
                    >
                      {decks[index].name || "Untitled Deck"}
                    </Link>
                  </Tooltip>
                </div>
              </BlackContainer>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

export default DeckGrid;
