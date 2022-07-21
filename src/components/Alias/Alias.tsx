import React, {useEffect, useMemo, useState} from 'react';
import {useTimer} from 'react-timer-hook';
import {getWordsAsync, selectGame} from "../../redux/gameSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getShuffled} from "../api";
import Button from "../Button/Button";
import classes from './Alias.module.scss'

const Alias = () => {
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [skip, setSkip] = useState(0)
    const dispatch = useAppDispatch();

    let time = new Date();

    const {
        seconds,
        isRunning,
        restart,
    } = useTimer({expiryTimestamp: time, onExpire: () => console.warn('onExpire called')})

    const {status, words} = useAppSelector(selectGame);

    useEffect(() => {
        if (words.length === 0) {
            dispatch(getWordsAsync())
        }
    }, [dispatch, words.length])

    const shuffled = useMemo(() =>
            getShuffled(words)
        , [words])


    if (status === 'loading' || words.length === 0) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className={classes.alias}>
            <span>{`Верно: ${correct}`}</span>
            <span>{`Пропущено: ${skip}`}</span><span>{`Итог: ${correct - skip}`}</span>
            <h1>{isRunning ? shuffled[index].tat.toUpperCase() : 'Алиас'}</h1>
            <span>{isRunning ?  shuffled[index].rus.toUpperCase() : 'Нажми Старт для начала игры!'}</span>
            <div style={{fontSize: '100px'}}>
                {seconds}
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {isRunning && (<div>

                    <Button
                        onClick={() => {
                            setSkip(prevState => prevState + 1)
                            setIndex(prevState => prevState + 1)
                        }}
                    >Пропустить</Button>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={() => {
                        setCorrect(prevState => prevState + 1)
                        setIndex(prevState => prevState + 1)
                    }}
                    >
                        Верно
                    </Button>
                </div>)}
                {!isRunning &&
                    <>
                    <Button onClick={() => {
                        setCorrect(0)
                        setSkip(0)
                        time = new Date();
                        time.setSeconds(time.getSeconds() + 60);
                        restart(time)
                    }}
                    >
                        Старт
                    </Button>
                    </>
                }


            </div>

        </div>
    );
};

export default Alias;