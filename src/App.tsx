import React from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";

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
            <main style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
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
