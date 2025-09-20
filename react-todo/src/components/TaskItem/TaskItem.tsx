import React from 'react'
import styled from 'styled-components'
import type { Todo } from '../../App'

const Item = styled.li<{done: boolean}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-radius: 5px;
    border: 2px slid #ccc;
    background: ${({done}) => (done ? '#eee' : '#fff')};
`;

const Text = styled.span<{done: boolean}>`
    text-decoration: ${({done}) => (done ? 'line-through' : 'none')};
    color: ${({done}) => (done ? 'red' : 'black')};
`;

const Button = styled.button`
    background-color: brown;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 80px;
    &:hover { opacity: 0.8; }
`;

type Props = {
    item: Todo;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function TaskItem({item, onToggle, onRemove}: Props) {
    return (
        <Item done={item.done}>
            <input type='checkbox' checked={item.done} onChange={() => onToggle(item.id)} />
            <Text done={item.done}>{item.text}</Text>
            <Button onClick={() => onRemove(item.id)}>Delete</Button>
        </Item>
    );
}