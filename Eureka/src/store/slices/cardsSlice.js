import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contentService } from '../../services/contentService';

export const fetchCards = createAsyncThunk('cards/fetchCards', async (lessonId) => {
  const lesson = contentService.getLessonById(lessonId);
  return lesson ? lesson.contentCards : [];
});

export const saveCardAction = createAsyncThunk('cards/saveCard', async ({ lessonId, cards }) => {
  const lesson = contentService.getLessonById(lessonId);
  if (lesson) {
    contentService.saveLesson({ ...lesson, contentCards: cards });
  }
  return cards;
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updateCardLocal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((card) => card.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    updateBlockLocal: (state, action) => {
      const { cardId, blockId, updates } = action.payload;
      const cardIndex = state.items.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        const blockIndex = state.items[cardIndex].blocks.findIndex((block) => block.id === blockId);
        if (blockIndex !== -1) {
          state.items[cardIndex].blocks[blockIndex] = {
            ...state.items[cardIndex].blocks[blockIndex],
            ...updates,
          };
        }
      }
    },
    addBlockLocal: (state, action) => {
      const { cardId, block } = action.payload;
      const cardIndex = state.items.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        state.items[cardIndex].blocks.push(block);
      }
    },
    removeBlockLocal: (state, action) => {
      const { cardId, blockId } = action.payload;
      const cardIndex = state.items.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        state.items[cardIndex].blocks = state.items[cardIndex].blocks.filter(
          (block) => block.id !== blockId
        );
      }
    },
    reorderBlocksLocal: (state, action) => {
      const { cardId, blocks } = action.payload;
      const cardIndex = state.items.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        state.items[cardIndex].blocks = blocks;
      }
    },
    addCardLocal: (state, action) => {
      state.items.push(action.payload);
    },
    removeCardLocal: (state, action) => {
      state.items = state.items.filter((card) => card.id !== action.payload);
    },
    reorderCardsLocal: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(saveCardAction.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { 
  updateCardLocal, 
  updateBlockLocal,
  addBlockLocal,
  removeBlockLocal,
  reorderBlocksLocal,
  addCardLocal, 
  removeCardLocal, 
  reorderCardsLocal 
} = cardsSlice.actions;
export default cardsSlice.reducer;
