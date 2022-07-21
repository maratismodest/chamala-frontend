import axios from "axios";
import {WordProps} from "../../App";

export const getShuffled = (arr: WordProps[]): WordProps[] => arr
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)

export const putWord = async (word: WordProps) => {
    try {
        const res = await axios.put(`https://chamala-backend.herokuapp.com/api/phrase/${word.id}`, {
            ...word,
            audio: `https://talgat.corpus.tatar/search/rhvoice.php?t=${word.tat}`
        })
        console.log('putWord', res.data)
    } catch (e) {
        console.log('e', e)
    }
}

export const asyncForEach = async (array: WordProps[]) => {
    for (const element of array) {
        await putWord(element);
    }
    return true;
}
