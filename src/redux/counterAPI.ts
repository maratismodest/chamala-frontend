// A mock function to mimic making an async request for data
import axios from "axios";
import {WordProps} from "../App";

export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({data: amount}), 500)
    );
}

export function fetchWords() {
    return new Promise<{ data: WordProps[] }>(async (resolve) => {
            try {
                const response = await axios.get('https://chamala-backend.herokuapp.com/api/words')
                resolve({data: response.data})
            } catch (e) {
                console.log('e', e)
            }
        }
    );
}
