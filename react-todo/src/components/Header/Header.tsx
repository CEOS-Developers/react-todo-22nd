import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const Container = styled.header`
    display: grid;
    gap: 10px;
    text-align: center;
    margin-bottom: 40px;
    color: brown;
`;

const Button = styled.button<{ $active?: boolean}>`
    padding: 6px 10px;
    border: none;
    background: ${({ $active }) => ($active ? 'brown' : 'orange')};
    color: ${({ $active }) => ($active ? '#fff' : '#111')};
    cursor: pointer;
`;

type Props = {
    total: number;
    todo: number;
    done: number;
    filter: 'all' | 'todo' | 'done';
    onChangeFilter: (f: 'all' | 'todo' | 'done') => void;
};

export default function Header({ total, todo, done, filter, onChangeFilter }: Props) {
    return (
        <Container>
            <h1>React Todo</h1>
            <p>Total: {total} | todo: {todo} | done: {done}</p>
            <div>
                {(['all','todo','done'] as const).map((f) => (
                    <Button key={f} $active={filter === f} onClick={() => onChangeFilter(f)}>
                    </Button>
                ))}
            </div>
        </Container>
    )
}