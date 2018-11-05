import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createNewItem('Drink Coffee'),
            this.createNewItem('Have a lunch'),
            this.createNewItem('Learn React')
        ],
        search: '',
        mode: 'all'
    };

    createNewItem(label) {
        return {
            id: this.maxId++,
            label: label,
            important: false,
            done: false,
        };
    }

    addItem = (label) => {
        this.setState(({todoData}) => {
            return {
                todoData: [...todoData, this.createNewItem(label)]
            }
        })
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const newArray = [];
            todoData.forEach((el) => {
                if (el.id !== id) {
                    newArray.push(el);
                }
            });
            return {
                todoData: newArray
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const toggleEl = {...arr[idx], [propName]: !arr[idx][propName]};

        return [
            ...arr.slice(0, idx),
            toggleEl,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onSearch = (text) => {
        this.setState(() => {
            return {
                search: text.toLowerCase()
            }

        })
    };

    onDisplayModeChange = (newMode) => {
        this.setState(() => {
            return {
                mode: newMode
            }

        })
    };

    getVisible() {
        let newArray = [...this.state.todoData];
        const search = this.state.search;
        const mode = this.state.mode;
        if (search.length > 0) {
            newArray = newArray.filter((el) => {
                return el.label.toLowerCase().search(search) > -1;
            })
        }
        if (mode === 'active') {
            newArray = newArray.filter((el) => {
                return !el.done;
            })
        }
        if (mode === 'done') {
            newArray = newArray.filter((el) => {
                return el.done;
            })
        }
        return newArray;
    }

    render() {

        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const activeCount = this.state.todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={activeCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearch}/>
                    <ItemStatusFilter onDisplayModeChange={this.onDisplayModeChange} mode={this.state.mode}/>
                </div>

                <TodoList todoes={this.getVisible()}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <ItemAddForm onAddItem={this.addItem}/>
                <span className="github">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/alsiExp/react-todo-app">
                        <i className="fa fa-github" aria-hidden="true"></i> GitHub
                    </a>
                </span>

            </div>
        );
    }


};
