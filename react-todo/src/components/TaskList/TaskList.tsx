import React from "react";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";
import type { Todo } from '../../App'

const List = styled.ul`
    list-style: none;
    width:100%;
    display: grid;
    gap: 10px;
`;

type Props = {
    items: Todo[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
};

export default function TaskList({items, onToggle,onRemove}: Props) {
    return (
        <List>
            {items.map((task) => (
                <TaskItem key={task.id} item={task} onToggle={onToggle} onRemove={onRemove} />
            ))}
        </List>
    );
}