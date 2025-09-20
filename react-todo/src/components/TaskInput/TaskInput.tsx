import React, { useState } from 'react';
import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 5px;
`;

const Button = styled.button<{ hover?: boolean}>`
    padding: 10px;
    background: brown;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover { opacity: 0.8; }
`;

type Props = {
    addTodo: (text: string) => void;
};

export default function TaskInput({ addTodo }: Props) {
    const [text, setText] = useState('');

    const enter = () => {
        const t = text.trim()
        if(!t) return;
        addTodo(t);
        setText('');
    };

    return (
        <Row>
            <Input
                type='text'
                placeholder='add a new task'
                value={text}
                onChange={(e) =>setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enter()}
            />
            <Button onClick={enter}>Enter</Button>
        </Row>
    )
}