import React, {useEffect, useMemo, useState} from 'react';
import {Button, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios";
import {PokemonDetail} from "./PokemonDetail";
import Modal from "antd/es/modal/Modal";

interface DataType {
    key: string;
    name: string;
    url: string;
}

interface IPokemon {
    key: string;
    name: string
    url: string;
}

export const PokemonsPage = () => {
    const [pokemons, setPokemons] = useState<IPokemon[] | undefined>();
    const [total, setTotal] = useState<number | undefined>();

    const [detailUrl, setDetailUrl] = useState<string | undefined>();

    const [pageNumber, setPageNumber] = useState<number>(0)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${pageNumber * 10}`).then(({ data }) => {
            setPokemons(data.results);
            setTotal(data.count);
        }).finally(() => {
            setLoading(false);
        });
    }, [pageNumber]);

    const data : DataType[] = useMemo(() => {
        return pokemons?.map(x => ({ key: x.key, name: x.name, url: x.url} as DataType)) ?? [];
    }, [pokemons])


    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => {
                    setDetailUrl(record.url)
                    showModal();
                }}>
                    Detail
                </Button>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <h1>Pokemons</h1>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}

                pagination={{
                    total: total,
                    onChange: (page) => {setPageNumber(page)},
                    pageSize: 20,
                    showSizeChanger: false,
                }}
            />
            <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <PokemonDetail url={detailUrl}/>
            </Modal>
        </>
    )
}







