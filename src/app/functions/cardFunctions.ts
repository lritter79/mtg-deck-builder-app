import {
  CardRarityTypes,
  CardSuperTypes,
  CardTypes,
  GathererCard,
} from "@/types/gatherer";
import Logger from "ts-logger-node";

export async function fetchCard(id: number): Promise<GathererCard> {
  const res = await fetch(
    `http://api.magicthegathering.io/v1/cards/${id}`
  ).catch((e) => {
    throw e;
  });
  if (res.status === 500) throw "500 error on card fetch request";
  const cardRes: { card: GathererCard } = await res.json();
  return cardRes.card;
}

function filterDuplicateCards(cards: GathererCard[]): GathererCard[] {
  const uniqueCards: { [name: string]: GathererCard } = {};

  for (const card of cards) {
    if (
      !uniqueCards[card.name] ||
      card.multiverseid > uniqueCards[card.name].multiverseid
    ) {
      uniqueCards[card.name] = card;
    }
  }

  const sortedCards = Object.values(uniqueCards).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sortedCards;
}

export async function fetchCardsByName(
  name: string,
  cardTypeFilters?: CardTypes[],
  cardSuperTypes?: CardSuperTypes[],
  cardRarities?: CardRarityTypes[]
): Promise<GathererCard[]> {
  let url = `https://api.magicthegathering.io/v1/cards?name=${name}&contains=imageUrl|multiverseid`;
  if (cardTypeFilters) {
    url = url + "&types=";
    for (let _i = 0; _i < cardTypeFilters.length; _i++) {
      url = url + cardTypeFilters[_i];
      if (_i < cardTypeFilters.length - 1) url = url + "|";
    }
  }

  if (cardSuperTypes) {
    url = url + "&supertypes=";
    for (let _i = 0; _i < cardSuperTypes.length; _i++) {
      url = url + cardSuperTypes[_i];
      if (_i < cardSuperTypes.length - 1) url = url + ",";
    }
  }

  if (cardRarities) {
    url = url + "&rarity=";
    for (let _i = 0; _i < cardRarities.length; _i++) {
      url = url + cardRarities[_i];
      if (_i < cardRarities.length - 1) url = url + "|";
    }
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((e) => {
    Logger.print(JSON.stringify(e), "ERROR");
    throw e;
  });
  const card = await res.json();
  return filterDuplicateCards(card.cards);
}

export async function getCardsInDeck(ids: number[]): Promise<GathererCard[]> {
  const uniqueSet: Set<number> = new Set();

  // Loop through the input array and add each number to the Set
  for (const num of ids) {
    uniqueSet.add(num);
  }
  let idString = "";
  for (let i = 0; i < Array.from(uniqueSet).length; i++) {
    idString += Array.from(uniqueSet)[i];
    if (i < Array.from(uniqueSet).length - 1) idString += "|";
  }

  const res = await fetch(
    `http://api.magicthegathering.io/v1/cards?multiverseid=${idString}`
  ).catch((e) => {
    throw e;
  });
  if (res.status === 500 || res.status === 503)
    throw "500 error on card fetch request";
  const cardsRes: { cards: GathererCard[] } = await res.json();

  return cardsRes.cards;
}

export function mapCardsByQuantityToAdd(
  arr: { [multiverseid: number]: number }[],
  deckId: number,
  versionId: string
): {
  deck_id: number;
  gatherer_id?: string | null;
  id?: number;
  multiverse_id: number;
  version_id: string;
  number_of_copies: number | null;
}[] {
  return arr.map((item) => {
    const multiverse_id = Object.keys(item)[0];
    const number_of_copies = item[+multiverse_id];

    return {
      multiverse_id: Number(multiverse_id),
      number_of_copies: number_of_copies || null,
      deck_id: deckId,
      version_id: versionId,
    };
  });
}
