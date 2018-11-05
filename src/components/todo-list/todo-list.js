import React from "react";

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

const TodoList = ({todoes, onDeleted, onToggleImportant, onToggleDone}) => {

    const elements = todoes.map(({id, label, visible, important, done}) => {

            let elementClassName = 'list-group-item';

            return (
                <li key={id} className={elementClassName}>
                    <TodoListItem
                        label={label}
                        important={important}
                        done={done}
                        onDeleted={() => {
                            onDeleted(id)
                        }}
                        onToggleImportant={() => {
                            onToggleImportant(id)
                        }}
                        onToggleDone={() => {
                            onToggleDone(id)
                        }}
                    />
                </li>
            )


        }
    );

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;