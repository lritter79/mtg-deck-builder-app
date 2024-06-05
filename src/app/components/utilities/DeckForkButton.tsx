"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DeckForkButton = ({
  deckId,
  versionId,
}: {
  deckId: number;
  versionId: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const forkHandler = async () => {
    console.log("forked");
    setLoading(true);
    const res = await fetch(`${location.origin}/decks/api/fork`, {
      method: "POST",
      body: JSON.stringify({
        deckId,
        versionId,
      }),
    });
    if (res.status === 201 || res.status === 200) {
      let data = await res.json();

      console.log(`>>>${JSON.stringify(res)}`);
      router.push(`/decks/${data}`);
    } else console.log(`error: ${JSON.stringify(res)}`);
    setLoading(false);
  };

  return (
    <button
      className="mt-1 bg-white text-black font-bold py-2 px-4 rounded-full border-slate-300"
      type="submit"
      onClick={() => {
        if (confirm("Are you sure you want to fork this deck?"))
          forkHandler();
      }}
      disabled={loading}
    >
      Fork
    </button>
  );
};

export default DeckForkButton;
