"use client";

import { use, useEffect, useState } from "react";
import DeckVersionFilter from "./deckVersionFilter";
import { GathererCard } from "@/types/gatherer";
import CardTooltip from "../cardTooltip";
import VictoryTracker from "./VictoryTracker";
import DeckForkButton from "../utilities/DeckForkButton";

type DeckListProps = {
  deckId: number;
  userId: string | null;
  deckUserId: string | null;
  versions:
    | {
        created_at: string | null;
        deck_id: number | null;
        id: string;
        losses: number | null;
        wins: number | null;
      }[]
    | null;
  deck: {
    [versionId: string]: {
      id: number;
      multiverse_id: number;
      number_of_copies: number | null;
      gathererCard: GathererCard | undefined;
    }[];
  };
};

const DeckList: React.FC<DeckListProps> = ({
  versions,
  deck,
  userId,
  deckUserId,
  deckId,
}) => {
  const [deckVersionArr, setDeckVersionArr] = useState(
    versions || []
  );
  const [deckVersion, setDeckVersion] = useState<string | null>(
    versions && versions.length > 0 ? versions[0].id : null
  );
  const selectedVersion = versions?.find(
    (version) => version.id === deckVersion
  );

  useEffect(() => {
    if (deckVersion)
      console.log(`>>>${JSON.stringify(deck[deckVersion])}`);
  }, [selectedVersion]);

  const updateWinsAndLossesCallback = (
    wins: number,
    losses: number,
    versionId: string
  ): void => {
    let version = deckVersionArr.find(
      (version) => version.id === versionId
    );
    if (version) {
      version.losses = losses;
      version.wins = wins;

      const allOtherDecks = deckVersionArr.filter(
        (version) => version.id !== versionId
      );

      setDeckVersionArr([...allOtherDecks, version]);
    }
  };

  return (
    <div>
      {userId && userId !== deckUserId && deckVersion && (
        <div>
          <DeckForkButton deckId={deckId} versionId={deckVersion} />
        </div>
      )}
      <DeckVersionFilter
        versions={versions}
        setDeckVersion={setDeckVersion}
        defaultValue={deckVersion}
      />
      {userId &&
        userId === deckUserId &&
        deckVersion &&
        selectedVersion && (
          <VictoryTracker
            updateWinsAndLossesCallback={updateWinsAndLossesCallback}
            wins={selectedVersion?.wins || 0}
            losses={selectedVersion?.losses || 0}
            versionId={deckVersion}
            deckId={selectedVersion.deck_id || 0}
          />
        )}
      {deckVersion && (
        <ul className="list-disc ml-8">
          {deck[deckVersion].map((card) => (
            <li key={card.id}>
              <div>
                <CardTooltip
                  imageUrl={card.gathererCard?.imageUrl || ""}
                >
                  <p className="underline	">
                    {card.gathererCard?.name}
                  </p>{" "}
                </CardTooltip>{" "}
                <p className="inline-block">
                  x{card.number_of_copies}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeckList;
