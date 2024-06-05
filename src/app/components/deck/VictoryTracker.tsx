import React, { useEffect, useState } from 'react';
import WinsAndLossesEditor from '../deckbuilder/editors/winsAndLossEditor';
type VictoryTrackerProps = {
  wins: number; // New property: number of wins for the deck
  losses: number; // New property: number of losses for the deck
  versionId: string; // New property: a string identifier for the version of the deck
  deckId: number;
  updateWinsAndLossesCallback: (
    wins: number,
    losses: number,
    versionId: string
  ) => void;
};
const VictoryTracker: React.FC<VictoryTrackerProps> = (props) => {
  const [wins, setWins] = useState<number>(props.wins); // New state for wins
  const [losses, setLosses] = useState<number>(props.losses); // New state for losses
  const { versionId, updateWinsAndLossesCallback } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setWins(props.wins);
    setLosses(props.losses);
  }, [props]);
  const handleWinsChange = (newWins: number) => {
    setWins(newWins);
  };

  const handleLossesChange = (newLosses: number) => {
    setLosses(newLosses);
  };

  const editVictories = async () => {
    setLoading(true);
    const res = await fetch(
      `${location.origin}/decks/api/${props.deckId}/victories`,
      {
        method: 'PUT',
        body: JSON.stringify({
          losses,
          wins,
          versionId,
        }),
      }
    );
    if (res.status === 201 || res.status === 200) {
      console.log(`>>>${JSON.stringify(res)}`);
      updateWinsAndLossesCallback(wins, losses, versionId);
    } else console.log(`error: ${JSON.stringify(res)}`);
    setLoading(false);
  };

  return (
    <>
      {' '}
      <div className="flex items-center">
        <WinsAndLossesEditor
          label={'Wins'}
          value={wins}
          onChange={handleWinsChange}
          loading={loading}
        />
        <WinsAndLossesEditor
          label={'Losses'}
          value={losses}
          onChange={handleLossesChange}
          loading={loading}
        />
      </div>{' '}
      <button
        disabled={loading}
        onClick={() => {
          editVictories();
        }}
        className={`mt-1 bg-white text-black font-bold py-2 px-4 rounded ${
          loading ? 'disabled:opacity-75' : ''
        }`}
      >
        Save Deck
      </button>
    </>
  );
};

export default VictoryTracker;
