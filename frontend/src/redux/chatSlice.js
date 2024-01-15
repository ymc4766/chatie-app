import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CHATS_URL, CONVERSATIONS_URL } from "./constants";
const CONVERSATION_URL = `${CONVERSATIONS_URL}`;
const MESSAGES_URL = `${CHATS_URL}`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
};

export const getConversations = createAsyncThunk(
  "/conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${CONVERSATION_URL}/conversation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.respose.data.error.message);
    }
  }
);

export const open_create_conversations = createAsyncThunk(
  "/conversation/open_create",
  async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    try {
      const { data } = await axios.post(
        `${CONVERSATION_URL}`,
        { receiver_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.respose.data.error.message);
    }
  }
);

export const getConversationMessage = createAsyncThunk(
  "/conversation/messages",
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const { data } = await axios.get(`${MESSAGES_URL}/${convo_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.respose.data.error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "/conversation/messages/send",
  async (values, { rejectWithValue }) => {
    const { token, message, convo_id, files } = values;
    try {
      const { data } = await axios.post(
        `${MESSAGES_URL}`,
        { message, convo_id, files },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.respose.data.error.message);
    }
  }
);
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateMessages: (state, action) => {
      let convo = state.activeConversation;

      if (convo?._id === action.payload?.activeConversation?._id) {
        state.messages = [...state.messages, action.payload];
      }

      //update conve
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvos = [...state.conversations].filter(
        (c) => c._id !== conversation._id
      );
      newConvos.unshift(conversation);
      state.conversations = newConvos;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(open_create_conversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(open_create_conversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
      })
      .addCase(open_create_conversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getConversationMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversationMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getConversationMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
        // state.conversations = newConvos;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation, updateMessages } = chatSlice.actions;
export default chatSlice.reducer;
