import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentItemProps} from "../types/types";
import getCommentsRequest from "../api/comments/getCommentsRequest";

type commentsStateProps = {
    comments: CommentItemProps[] | [],
    commentsCount: number
    commentLikes: number
    error: null | boolean,
    loading?: null | boolean
    totalPage: number,
    page: number
    isLoad: boolean
}

const initialState: commentsStateProps = {
    comments: [],
    commentsCount: 0,
    commentLikes: 0,
    loading: null,
    error: null,
    totalPage: 0,
    page: 1,
    isLoad: false
};

const iterableLikes = (data: CommentItemProps[]) => data.reduce((acc: any, item: any) => {
    const likes = item.likes ? item.likes : 0;
    return acc + likes;
}, 0)

const isError = (action: AnyAction) => action.type.endsWith('rejected');

const commentsSlice = createSlice({
    name: 'commentsSlice',
    initialState: initialState,
    reducers: {
        commentLikesToggle: (state, { payload }) => {
            payload ? state.commentLikes++ : state.commentLikes--;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCommentsRequest.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getCommentsRequest.fulfilled, (state, { payload}) => {
                const data: CommentItemProps[] = [...payload.authors, ...payload.data.data].reduce((acc, item) => {
                    const index = acc.findIndex((i: any) => i.id === item.id);
                    index !== -1 ? (acc[index] = {...acc[index], ...item}) : acc.push(item)
                    return acc
                }, []);
                const result = data.filter(item => Object.keys(item).includes('text'));

                state.loading = false;

                if (payload.init) {
                    state.page = 2;
                    state.comments = [...result];
                    state.commentsCount = state.comments.length;
                    state.commentLikes = iterableLikes(state.comments);
                    state.totalPage = payload.data.pagination.total_pages;
                } else {
                    state.page += 1;
                    state.error = false;
                    state.comments = [...state.comments, ...result];
                    state.commentsCount = state.comments.length;
                    state.commentLikes += iterableLikes(result);
                }

                if (state.page > state.totalPage) {
                    state.isLoad = true;
                }
            })
            .addMatcher(isError, (state, action: PayloadAction<boolean>) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { commentLikesToggle } = commentsSlice.actions;

export default commentsSlice.reducer;
