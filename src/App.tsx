import React from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
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
                    <Route path={'game'} element={<Game/>}/>
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
