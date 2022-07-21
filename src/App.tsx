import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Alias from "./components/Alias/Alias";
import Footer from "./components/Footer/Footer";
import Guess from "./components/Guess/Guess";
import Header from "./components/Header/Header";
import PickGame from "./components/PickGame/PickGame";
import Welcome from "./components/Welcome/Welcome";
import {Counter} from "./features/counter/Counter";
import {getWordsAsync, selectGame} from "./redux/gameSlice";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import classes from './styles.module.scss'

export interface WordProps {
    id: number,
    rus: string,
    tat: string,
    audio: string
}

export const routes = {
    main: "/",
    pickGame: "/pick-game",
    guess: "/guess",
    alias: "/alias",
    counter: "/counter"
}

function App() {
    const dispatch = useAppDispatch();
    const {words} = useAppSelector(selectGame);

    useEffect(() => {
        if (words.length === 0) {
            dispatch(getWordsAsync())
        }
    }, [dispatch, words.length])

    return (
        <BrowserRouter>
            <Header/>
            <main className={classes.main}>
                <Routes>
                    <Route index element={<Welcome/>}/>
                    <Route path={routes.pickGame} element={<PickGame/>}/>
                    <Route path={routes.guess} element={<Guess/>}/>
                    <Route path={routes.alias} element={<Alias/>}/>
                    <Route path={routes.counter} element={<Counter/>}/>
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
