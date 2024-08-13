import MatchBox from "./MatchBox";

interface userPuuid {
  puuid: string;
}
interface Participant {
  summonerName: string;
  riotIdGameName: string;
  riotIdTagline: string;
  championName: string;
  champLevel: string;
  role: string;
  lane: string;
  summonerLevel: string;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  puuid: string;
}
interface MatchInfo {
  win: boolean;
  gameMode?: string;
  endOfGameResult: string;
  participants: Participant[];
}
interface Match {
  info: MatchInfo;
}

export default async function Matchs() {

    let matchInfoDataArray = [];
  const GAME_NAME = "Fran4all";
  const TAG_LINE = "LAS";
  const API_KEY = process.env.API_KEY;

  const user: userPuuid = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${GAME_NAME}/${TAG_LINE}?api_key=${API_KEY}`
  ).then((res) => res.json());
  const puuid = user.puuid;

  const matches = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&&api_key=${API_KEY}`
  ).then((res) => res.json());
  const matchesList = matches;

  const matchInfoPromises = matchesList.map(async (matchId: string) => {
    const matchInfo = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
    ).then((res) => res.json());
    return matchInfo;
  });

  matchInfoDataArray = await Promise.all(matchInfoPromises);

  return (
    <div className="w-full">
        <ul>
            {matchInfoDataArray
            .filter(
                (match: Match) =>
                match.info.gameMode === "CLASSIC" || match.info.gameMode === "ARAM"
            )
            .map((match: Match, matchIndex: number) => (
                <li key={matchIndex}>
                {match.info.participants
                .filter(
                (participant: Participant) =>
                    participant.puuid === puuid
                )
                .map((participant: Participant, participantIndex: number) => (
                    <MatchBox key={participantIndex} summonerName={participant.summonerName} championName={participant.championName} role={participant.role} lane={participant.lane} kills={participant.kills} deaths={participant.deaths} win={participant.win} assists={participant.assists}/>
                ))}
            </li>
            ))}
      </ul>
    </div>
  );
}
