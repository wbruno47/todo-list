import { createContext, useContext, useMemo, useState } from 'react';

const AppStateContext = createContext({
    todos: [],
    allTodos: [],
    currentId: null,
    currentTitle: '',
});

export function AppState({ children }) {
    const [todos, setTodos] = useState([]);
    const [allTodos, setAllTodos] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    const value = useMemo(
        () => ({
            todos: todos,
            setTodos,
            allTodos: allTodos,
            setAllTodos,
            currentId,
            setCurrentId,
            currentTitle,
            setCurrentTitle
        }),
        [todos, allTodos, currentId, currentTitle]
    );

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppStateContext);

    if (context === undefined) {
        throw new Error('useAppState must be used within a AppStateProvider');
    }

    return context;
}
