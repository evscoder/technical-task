import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import getAuthorsRequest from "../authors/getAuthorsRequest";

type Props = {
    page: number,
    init?: boolean
}

const getCommentsRequest = createAsyncThunk('commentsSlice/getCommentsRequest', async ({init, page}: Props, { rejectWithValue }) => {
    try {
        const authors = await getAuthorsRequest();
        const {data} = await axios.get("/api/comments", {params: {page}});

        return {init, authors, data};
    } catch(error) {
        return rejectWithValue('Server Error');
    }
});

export default getCommentsRequest;
