import React from "react";
import { GameProvider } from "./context/gameContext";
import { HomePage } from "./Pages/HomePage";

const AppState = ({ children }: any) => {
    return <GameProvider>{children}</GameProvider>;
};

const App = () => {
    return (
        <>
            <AppState>
                <HomePage />
            </AppState>
        </>
    );
};

export default App;
