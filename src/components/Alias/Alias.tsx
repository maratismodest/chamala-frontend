import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useTimer} from 'react-timer-hook';
import {WordProps} from "../../App";
import {getWordsAsync, selectGame} from "../../redux/gameSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getShuffled} from "../api";
import Button from "../Button/Button";

const Alias = () => {
    const [index, setIndex] = useState(0)
    const result = useRef(0)
    const dispatch = useAppDispatch();
    let time = new Date();
    const {
        seconds,
        isRunning,
        restart,
    } = useTimer({expiryTimestamp: time, onExpire: () => console.warn('onExpire called')})
    const {status, words: backendWords} = useAppSelector(selectGame);
    const [words, setWords] = useState<WordProps[]>([])
    useEffect(() => {
        if (backendWords.length > 0) {
            setWords(getShuffled(backendWords));
            localStorage.setItem('words', JSON.stringify(backendWords))
        }

    }, [backendWords])

    useEffect(() => {
        if (backendWords.length === 0) {
            dispatch(getWordsAsync())
        }
    }, [dispatch])

    const shuffled = useMemo(() =>
            getShuffled(words)
        , [words])


    if (words.length === 0) {
        return (
            <div>Loading</div>
        )
    }

    console.log('res', result.current)
    return (
        <div style={{textAlign: 'center'}}>
            <h1>{isRunning ? shuffled[index].tat : 'Alias'}</h1>
            {isRunning ? 'Game' : 'Result is:' + result.current}
            <div style={{fontSize: '100px'}}>
                {seconds}
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button onClick={() => {
                    result.current = result.current + 1
                    setIndex(prevState => prevState + 1)
                }}
                        disabled={!isRunning}
                        style={{marginBottom: 16}}
                >
                    Correct
                </Button>
                <Button
                    disabled={!isRunning}
                    onClick={() => {
                        setIndex(prevState => prevState + 1)
                    }}
                    style={{marginBottom: 16}}>Skip</Button>
                <Button onClick={() => {
                    result.current = 0
                    time = new Date();
                    time.setSeconds(time.getSeconds() + 60);
                    restart(time)
                }}
                        style={{marginBottom: 16}}
                >Restart
                </Button>
            </div>

        </div>
    );
};

export default Alias;