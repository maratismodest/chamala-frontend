import React, {useEffect, useState} from 'react';
import {getShuffled} from "../../api";
import {WordProps} from "../../App";
import {selectGame} from "../../redux/gameSlice";
import {useAppSelector} from "../../redux/hooks";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {ReactComponent as Happy} from "./../../assets/happy.svg";
import {ReactComponent as Sad} from "./../../assets/sad.svg";

const Guess = () => {
    const {status, words} = useAppSelector(selectGame);
    const [list, setList] = useState<WordProps[]>([])
    const [correct, setCorrect] = useState<WordProps | undefined>(undefined)
    const [clicked, setClicked] = useState<WordProps | undefined>(undefined)
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (words.length > 0) {
            const tempList = getShuffled(words).slice(0, 4)
            setList(tempList)
            setCorrect(getShuffled(tempList)[0])
            localStorage.setItem('words', JSON.stringify(words))
        }

    }, [words])


    const closeModal = () => {
        setClicked(undefined)
        const tempList = getShuffled(words).slice(0, 4)
        setList(tempList)
        setCorrect(getShuffled(tempList)[0])
        setIsOpen(false);
    }

    const handleClick = (id: number) => {
        setClicked(list.find(x => x.id === id))
        setIsOpen(true);
    }

    if (status === 'loading' || words.length === 0) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <>
            <h1>{correct?.tat}</h1>
            <audio src={correct?.audio} controls>
                Your browser does not support the audio element.
            </audio>
            <ul style={{marginTop: 16}}>
                {list.map(({id, tat, rus}) => <li key={id} style={{
                    marginBottom: 16
                }}><Button
                    onClick={() => handleClick(id)}>{rus}</Button>
                </li>)}
            </ul>
            <Modal
                isOpen={modalIsOpen}
                closeModal={closeModal}
            >
                {correct?.id === clicked?.id ? <Happy style={{width: 90, height: 90}}/> :
                    <Sad style={{width: 90, height: 90}}/>}
                <h3>{correct?.id === clicked?.id ? 'Верно' : 'Неверно'}</h3>
                <Button onClick={closeModal}>Далее</Button>
            </Modal>
        </>
    );
};

export default Guess;
