
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditModalOpen: false,
    isCreateModalOpen: false,
    editAbleContent: {},
}

const generalSlice = createSlice({
    name: 'general',
    initialState: initialState,
    reducers: {
        toggleEditModal: (state, action) => {
            console.log(action.payload)
            state.editAbleContent = action.payload
            state.isEditModalOpen = !state.isEditModalOpen;
        },
        toggleCreateModal: (state) => {
            state.isCreateModalOpen = !state.isCreateModalOpen;
        },
    }
})

export const { toggleCreateModal, toggleEditModal } = generalSlice.actions;

export const getIsEditModalOpen = (state) => state.general.isEditModalOpen;
export const getIsCreateModalOpen = (state) => state.general.isCreateModalOpen;

export default generalSlice.reducer;