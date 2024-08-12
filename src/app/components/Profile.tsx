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

  return (<div>
        <Image src={summonerIcon} alt={'Profile'} width={200} height={200} />
        <h2>{GAME_NAME + '#' + TAG_LINE}</h2>
        <p>{'Level: ' + summonerLevel}</p>
    </div>
    );
}
