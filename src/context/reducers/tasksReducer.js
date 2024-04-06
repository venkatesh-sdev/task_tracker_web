import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid'
import { status } from "../../constants/enums";

const initialState = {
    // Storing a Data in a Local Storage
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    pendingTasks: [],
    completedTasks: [],
    deployedTasks: [],
    defferedTasks: [],
    inProgressTasks: [],
    recoverTasks: [],
    isFilterApplied: false,
}

// To Add A Task To the Function
const addTaskFn = (state, action) => {
    const newTask = {
        title: action.payload.title,
        description: action.payload.description,
        status: status.pending,
        assignee: action.payload.assignee,
        priority: action.payload.priority,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: '',
        completedAt: '',
        team: action.payload.team,
    };
    state.tasks = [...state.tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
}

// To Edit the Task only priority and Status allowed
const editTaskFn = (state, action) => {
    const tempDate = new Date();
    state.tasks = state.tasks.map(
        task => {
            // ------ 
            if (task.id === action.payload.id) {
                return {
                    ...task,
                    priority: action.payload.priority || task.priority,
                    status: action.payload.status || task.status,
                    updatedAt: new Date(
                        tempDate.getFullYear(),
                        tempDate.getMonth(),
                        tempDate.getDate()
                    ),
                    completedAt: action.payload.status === status.completed
                        ? new Date(
                            tempDate.getFullYear(),
                            tempDate.getMonth(),
                            tempDate.getDate()
                        ) : ''
                }
            }
            // ------
            return task;
        }
    )
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
}

// To Edit the Task Using Id
const deleteTaskFn = (state, action) => {
    state.tasks = state.tasks.filter(task => task.id !== action.payload);
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
}

// To Filter the Tasks
const getAllFilterTasksFn = (state, action) => {

    state.recoverTasks = state.tasks;
    state.tasks = state.tasks.filter(
        task =>
            // To Filter the Assignee with name
            (
                action.payload.assigneeName ?
                    task.assignee.toLowerCase().includes(action.payload.assigneeName.toLowerCase())
                    : true
            )
            // To Filter the task priority
            && (
                action.payload.priority
                    ? action.payload.priority === task.priority
                    : true
            )
            // To Filter the Task with a Date Range
            && (
                (action.payload.startDate && action.payload.endDate)
                    ? task.createdAt >= action.payload.startDate && task.createdAt <= action.payload.endDate : true
            )
    );
    state.isFilterApplied = true;
}

// To Seperate the Categoires
const categoriesTasksFn = (state) => {
    state.completedTasks = state.tasks.filter(task => task.status === status.completed);
    state.inProgressTasks = state.tasks.filter(task => task.status === status.inProgress);
    state.pendingTasks = state.tasks.filter(task => task.status === status.pending);
    state.deployedTasks = state.tasks.filter(task => task.status === status.deployed);
    state.defferedTasks = state.tasks.filter(task => task.status === status.deffred);
}

// Reset The filter Tasks
const resetTasksFn = (state) => {
    state.tasks = state.recoverTasks;
    state.recoverTasks = [];
    state.isFilterApplied = false;
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: addTaskFn,
        editTask: editTaskFn,
        deleteTask: deleteTaskFn,
        categoriesTasks: categoriesTasksFn,
        getAllFilterTasks: getAllFilterTasksFn,
        resetTasks: resetTasksFn,
    }
})

// Action Exports
export const {
    addTask,
    deleteTask,
    editTask,
    categoriesTasks,
    getAllFilterTasks,
    resetTasks,
} = tasksSlice.actions;


// Selector Exports
export const getAllTasks = (state) => state.tasks.tasks;
export const getCompletedTasks = (state) => state.tasks.completedTasks;
export const getInProgressTasks = (state) => state.tasks.inProgressTasks;
export const getPendingTasks = (state) => state.tasks.pendingTasks;
export const getDeployedTasks = (state) => state.tasks.deployedTasks;
export const getDefferdTasks = (state) => state.tasks.defferedTasks;
export const getIsFilterApplied = (state) => state.tasks.isFilterApplied;


export default tasksSlice.reducer;