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
    width: 80px;
    height: 40px;
    &:hover { opacity: 0.8; }
`;

type Props = {
    onAdd: (text: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
    const [text, setText] = useState('');

    const enter = () => {
        const t = text.trim()
        if(!t) return;
        onAdd(t);
        setText('');
    };

    return (
        <Row>
            <Input
                type='text'
                placeholder='add a new task'
                value={text}
                onChange={(e) =>setText(e.target.value)}
                onKeyDown={(e) => {//한글 엔터 두번 해결
                    if(e.key === 'Enter' && !(e.nativeEvent as any).isComposing)enter();
                }}
            />
            <Button onClick={enter}>Enter</Button>
        </Row>
    )
}