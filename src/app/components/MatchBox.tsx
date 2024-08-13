import React from 'react';
import Image from 'next/image';

interface props{
    key: number;
    summonerName: string;
    championName: string;
    role: string;
    lane: string;
    kills: number;
    deaths: number;
    assists: number;
    win: boolean;
}

export default function MatchBox(props:props){
    
    function formatChampionName(name: string): string {
        const cleanedName = name.replace(/\s+/g, '').replace(/[^\w]/g, '').toLowerCase();
        switch (name) {
        case 'LeeSin':
            return 'LeeSin'
        case 'JarvanIV':
            return 'JarvanIV'
        case 'TwistedFate':
            return 'TwistedFate'
        case 'MissFortune':
            return 'MissFortune'
        default:
        return cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
        }
    }

    return (
        <div className={"w-full p-2 flex items-center justify-between rounded-md mb-2 shadow-xl cursor-pointer " + (props.win ? 'bg-green-400' : 'bg-red-400')}>
            <div className='flex items-center'>
                <Image src={`https://ddragon.leagueoflegends.com/cdn/14.15.1/img/champion/${formatChampionName(props.championName)}.png`} alt={props.championName} width={50} height={50} className='rounded-full'/>
                <b className='ms-2'>{props.championName} - {props.kills+"/"+props.deaths+"/"+props.assists}</b>
            </div>
            <div>
                <span>{props.lane}</span>
                <b className='ms-2'>{props.win ? 'VICTORY' : 'DEFEAT'}</b>
            </div>
        </div>
    )
}