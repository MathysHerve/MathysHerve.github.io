import { Dispatch, ReactNode, createContext, useReducer } from 'react';


let initialDarkModeState = {darkMode: false};
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) {
    initialDarkModeState = {darkMode: true};
}

export const DarkModeContext = createContext<DarkModeState>(initialDarkModeState);
export const DarkModeDispatchContext = createContext<Dispatch<DarkModeAction> | null>(null);

interface Props {
    children: ReactNode;
}

export function DarkModeProvider({children} : Props) {
    const [darkMode, dispatch] = useReducer(darkModeReducer, initialDarkModeState);

    return (
        <DarkModeContext.Provider value={darkMode}>
            <DarkModeDispatchContext.Provider value = {dispatch}>
                {children}
            </DarkModeDispatchContext.Provider>
        </DarkModeContext.Provider>
    );
}

interface DarkModeState {
    darkMode: boolean
  }

type DarkModeAction = {
    type: "TOGGLE_DARK_MODE" | "ENABLE_DARK_MODE" | "DISABLE_DARK_MODE";
}
  

function darkModeReducer(state: DarkModeState , action: DarkModeAction) {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
          return { ...state, darkMode: !state.darkMode };
        case 'ENABLE_DARK_MODE':
            return {...state, darkMode: true};
        case 'DISABLE_DARK_MODE':
            return {...state, darkMode: false};
        default:
          return state;
      }
  }
  
  const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
  ];