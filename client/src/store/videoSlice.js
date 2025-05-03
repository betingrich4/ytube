import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
  searchResults: [],
  trendingVideos: []
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchVideosStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVideosSuccess(state, action) {
      state.videos = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchVideosFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchVideoSuccess(state, action) {
      state.currentVideo = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchVideosStart(state) {
      state.loading = true;
      state.error = null;
    },
    searchVideosSuccess(state, action) {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchVideosFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    likeVideoSuccess(state, action) {
      if (state.currentVideo) {
        state.currentVideo.likes = action.payload.likes;
        state.currentVideo.isLiked = action.payload.isLiked;
      }
    },
    clearError(state) {
      state.error = null;
    }
  }
});

export const {
  fetchVideosStart,
  fetchVideosSuccess,
  fetchVideosFailure,
  fetchVideoSuccess,
  searchVideosStart,
  searchVideosSuccess,
  searchVideosFailure,
  likeVideoSuccess,
  clearError
} = videoSlice.actions;

export default videoSlice.reducer;
