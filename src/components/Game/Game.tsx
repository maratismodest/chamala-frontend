import React, {useEffect, useState} from 'react';
import Button from "../Button/Button";
import {WordProps} from "../../App";
import {getShuffled, getWords} from "../api";

const Game = () => {
    const [words, setWords] = useState<WordProps[]>([])
    const [list, setList] = useState<WordProps[]>([])
    const [correct, setCorrect] = useState<WordProps | undefined>(undefined)

    useEffect(() => {
        getWords().then((res) => {
            setWords(res);
            const list = getShuffled(res).slice(0, 4)
            setList(list)
            setCorrect(list[0])
        })
    }, [])

    const handleClick = (id: number) => {
        if (correct) {
            if (correct.id === id) {
                alert('Correct')
            } else {
                alert('Wrong!' + correct.rus)
            }
            const temp = getShuffled(words).slice(0, 4)
            setList(temp)
            setCorrect(getShuffled(temp)[0])
        }

    }
    return (
        <>
            {((words.length > 0) && correct) ?
                <>
                    <h1>{correct.tat}</h1>
                    <audio src={correct.audio} controls>
                        Your browser does not support the audio element.
                    </audio>
                    <ul style={{marginTop: 16}}>
                        {list.map(({id, tat, rus}) => <li key={id} style={{
                            marginBottom: 16
                        }}><Button style={{width: '-webkit-fill-available'}}
                                   onClick={() => handleClick(id)}>{rus}</Button>
                        </li>)}
                    </ul>
                </> : null}
        </>
    );
};

export default Game;
