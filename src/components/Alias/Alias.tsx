import React, {useEffect, useMemo, useState} from 'react';
import {useTimer} from 'react-timer-hook';
import {getShuffled} from "../../api";
import {ReactComponent as Happy} from "../../assets/happy.svg";
import {getWordsAsync, selectGame} from "../../redux/gameSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import classes from './Alias.module.scss'

const Alias = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [skip, setSkip] = useState(0)
    const dispatch = useAppDispatch();
    const {status, words} = useAppSelector(selectGame);
    const shuffled = useMemo(() =>
            getShuffled(words)
        , [words])
    let time = new Date();

    const {
        seconds,
        isRunning,
        restart,
    } = useTimer({expiryTimestamp: time, autoStart: false, onExpire: () => setIsOpen(true)})


    useEffect(() => {
        if (words.length === 0) {
            dispatch(getWordsAsync())
        }
    }, [dispatch, words.length])


    if (status === 'loading' || words.length === 0) {
        return (
            <div>Loading</div>
        )
    }

    if (!isRunning) {
        return (
            <div className={classes.alias}>
                <h1>Алиас</h1>
                <span>Нажми Старт для начала игры!</span>
                <div style={{fontSize: '100px'}}>
                    {seconds}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Button onClick={() => {
                        setCorrect(0)
                        setSkip(0)
                        time = new Date();
                        time.setSeconds(time.getSeconds() + 5);
                        restart(time)
                    }}
                    >
                        Старт
                    </Button>
                </div>
                <Modal isOpen={modalIsOpen} closeModal={() => setIsOpen(false)}>
                    <>
                        <Happy style={{width: 120, height: 120}}/>
                        <span>{`Верно: ${correct}`}</span>
                        <span>{`Пропущено: ${skip}`}</span>
                        <span>{`Итог: ${correct - skip}`}</span>
                        <Button onClick={() => {
                            setIsOpen(false)
                            setCorrect(0)
                            setSkip(0)
                            time = new Date();
                            time.setSeconds(time.getSeconds() + 5);
                            restart(time)
                        }}>Старт</Button>
                    </>
                </Modal>
            </div>
        )
    }

    return (
        <div className={classes.alias}>
            <div>
                <span>{`Верно: ${correct}`}</span>
                <span>{`Пропущено: ${skip}`}</span>
                <span>{`Итог: ${correct - skip}`}</span>
            </div>

            <h1>{shuffled[index].tat.toUpperCase()}</h1>
            <span>{shuffled[index].rus.toUpperCase()}</span>
            <div style={{fontSize: '100px'}}>
                {seconds}
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>

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
                </div>
            </div>

        </div>
    );
};

export default Alias;
