import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [
    {
        id: 1,
        text: "Aprender React",
    },
    {
        id: 2,
        text: "Aprender JS",
    },
    {
        id: 3,
        text: "Aprender Vue.js",
    },
];

const App = () => {
    const [todos, setTodos] = useState(initialStateTodos);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const copyArray = [...todos];
        const [reOrderedItem] = copyArray.splice(startIndex, 1);
        copyArray.splice(endIndex, 0, reOrderedItem);

        setTodos(copyArray);
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <h1>TODO App</h1>
                <Droppable droppableId="todos">
                    {(droppableProvider) => (
                        <ul
                            ref={droppableProvider.innerRef}
                            {...droppableProvider.droppableProps}
                        >
                            {todos.map((todo, index) => (
                                <Draggable
                                    index={index}
                                    key={todo.id}
                                    draggableId={`${todo.id}`}
                                >
                                    {(draggableProvider) => (
                                        <li
                                            ref={draggableProvider.innerRef}
                                            {...draggableProvider.draggableProps}
                                            {...draggableProvider.dragHandleProps}
                                        >
                                            {todo.text}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvider.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default App;
