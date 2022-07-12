import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {WordProps} from "../App";
import {fetchPhrases, fetchWords} from './counterAPI';
import {RootState} from "./store";

export interface CounterState {
    status: 'idle' | 'loading' | 'failed';
    words: WordProps[],
    phrases: WordProps[]
}

const initialState: CounterState = {
    status: 'idle',
    words: [],
    phrases: []
};

export const getWordsAsync = createAsyncThunk(
    'counter/fetchWords',
    async () => {
        const response = await fetchWords();
        return response.data;
    }
);

export const getPhrasesAsync = createAsyncThunk(
    'counter/fetchPhrases',
    async () => {
        const response = await fetchPhrases();
        console.log('response',response)
        return response.data;
    }
);

export const gameSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWordsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWordsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.words = action.payload;
            })
            .addCase(getWordsAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getPhrasesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPhrasesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.phrases = action.payload;
            })
            .addCase(getPhrasesAsync.rejected, (state) => {
                state.status = 'failed';
            })

    },
});

export const selectGame = (state: RootState) => state.game
// export const {increment, decrement, incrementByAmount} = gameSlice.actions;


export default gameSlice.reducer;
