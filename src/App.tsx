import React from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Alias from "./components/Alias/Alias";
import Footer from "./components/Footer/Footer";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import Phrase from "./components/Phrase/Phrase";
import PickGame from "./components/PickGame/PickGame";
import Welcome from "./components/Welcome/Welcome";
import {Counter} from "./features/counter/Counter";
import classes from './styles.module.scss'

export interface WordProps {
    id: number,
    rus: string,
    tat: string,
    audio: string
}

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <main className={classes.main}>
                <Routes>
                    <Route index element={<Welcome/>}/>
                    <Route path={'pick-game'} element={<PickGame/>}/>
                    <Route path={'game'} element={<Game/>}/>
                    <Route path={'phrase'} element={<Phrase/>}/>
                    <Route path={'counter'} element={<Counter/>}/>
                    <Route path={'alias'} element={<Alias/>}/>
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
