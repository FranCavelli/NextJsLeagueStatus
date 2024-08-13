import Image from "next/image";

interface userPuuid {
  puuid: string;
}
interface summoner {
  id: string;
  summonerLevel: number;
  profileIconId: number;
}

export default async function Profile() {
  const GAME_NAME = "Fran4all";
  const TAG_LINE = "LAS";
  const API_KEY = process.env.API_KEY;

  const user: userPuuid = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${GAME_NAME}/${TAG_LINE}?api_key=${API_KEY}`
  ).then((res) => res.json());
  const puuid = user.puuid;

  const summoner: summoner = await fetch(
    `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
  ).then((res) => res.json());
  const summonerId = summoner.id;
  const summonerLevel = summoner.summonerLevel;
  const summonerIconID = summoner.profileIconId;
  const summonerIcon = `https://ddragon.leagueoflegends.com/cdn/14.15.1/img/profileicon/${summonerIconID}.png`;

  const leagueSummoner = await fetch(
    `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`).then((res) => res.json());

    const soloQRank = leagueSummoner[2].tier + " " + leagueSummoner[2].rank;
    const flexRank = leagueSummoner[0].tier + " " + leagueSummoner[0].rank;

    const soloQPoints = leagueSummoner[2].leaguePoints + " LPS";
    const flexPoints = leagueSummoner[0].leaguePoints + " LPS";
 
    const soloQWins = leagueSummoner[2].wins + " - " + leagueSummoner[2].losses;
    const flexWins = leagueSummoner[0].wins + " - " + leagueSummoner[0].losses;

    const soloQIMG = `/assets/images/${leagueSummoner[0].tier}.png`;
    
    const flexIMG = `/assets/images/${leagueSummoner[2].tier}.png`;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-1/2">
        <Image
          src={summonerIcon}
          alt={"Profile"}
          width={150}
          height={150}
          className="rounded-full"
        />
        <h2>{GAME_NAME + "#" + TAG_LINE}</h2>
        <p>{"Level: " + summonerLevel}</p>
      </div>
      <div className="flex flex-row items-center justify-center w-1/2">
          <div className="flex flex-col items-center justify-center text-center">
            <h2>SoloQ</h2>
            <Image
              src={soloQIMG}
              alt={"SoloQ IMG"}
              width={150}
              height={150}
            />
            <h3>{soloQRank}</h3>
            <p>{soloQPoints}</p>
            <p>{soloQWins}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h4>FLEX</h4>
            <Image
              src={flexIMG}
              alt={"Flex IMG"}
              width={150}
              height={150}
            />
            <h3>{flexRank}</h3>
          <p>{flexPoints}</p>
          <p>{flexWins}</p>
        </div>
      </div>
    </>
  );
}
