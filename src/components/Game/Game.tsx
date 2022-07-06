import React, {useEffect, useState} from 'react';
import {useDialogState,} from "reakit/Dialog";
import {WordProps} from "../../App";
import {getShuffled, getWords} from "../api";
import Button from "../Button/Button";

const Game = () => {
    const [words, setWords] = useState<WordProps[]>([])
    const [list, setList] = useState<WordProps[]>([])
    const [correct, setCorrect] = useState<WordProps | undefined>(undefined)
    // const dialog = useDialogState();

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
                        }}><Button
                            onClick={() => handleClick(id)}>{rus}</Button>
                        </li>)}
                    </ul>
                    {/*<DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>*/}
                    {/*<Dialog {...dialog} aria-label="Welcome">*/}
                    {/*    Welcome to Reakit!*/}
                    {/*</Dialog>*/}
                </> : null}
        </>
    );
};

export default Game;
