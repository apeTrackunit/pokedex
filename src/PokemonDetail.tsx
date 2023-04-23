import {useEffect, useState} from "react";
import axios from "axios";
import {Divider} from "antd";

interface PokemonDetailProps {
    url: string | undefined;
}

interface IPokemon {
    name: string;
    types: {
        type: {
            name: string
        }
    }[],
    stats: {
        base_stat: number,
        effort: number
        stat: {
            name: string;
        }
    }[],
    abilities: {
        ability: {
            name: string
        }
    }[],
    height: number,
    weight: number,
}

export const PokemonDetail = (props: PokemonDetailProps) => {
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState<IPokemon | undefined>();

    useEffect(() => {
        console.log(props.url)
        if(!props.url){
            return
        }

        setLoading(true);

        axios.get(props.url).then(({ data }) => {
            console.log(data)
            setPokemon(data);
        }).finally(() => {
            setLoading(false);
        });
    }, [props.url]);

    return (
        <>
            {loading ?
                <>Loading</>
                :
                <>
                    <h1>{pokemon?.name}</h1>
                    <Divider />

                    <h2>Dimensions</h2>
                    <div>Weight: {pokemon?.weight}</div>
                    <div>Height: {pokemon?.height}</div>

                    <Divider />

                    <h2>Types</h2>
                    {pokemon?.types?.map(x => {
                        return (
                            <div>{`${x.type.name}`}</div>
                        )
                    })}
                    <Divider />

                    <h2>Stats</h2>
                    {pokemon?.stats?.map(x => {
                        return (
                            <div>{`${x.stat.name}: ${x.base_stat}, Effort: ${x.effort}`}</div>
                        )
                    })}

                    <Divider />

                    <h2>Abilities</h2>
                    {pokemon?.abilities?.map(x => {
                        return (
                            <div>{`${x.ability.name}`}</div>
                        )
                    })}
                </>
            }
        </>
    )
}