/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5"
import PriorityDropDown from "./PriorityDropDown"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateModal, toggleEditModal } from "../../context/reducers/generalReducer";
import { addTask, editTask } from "../../context/reducers/tasksReducer";

import { priorities, status } from "../../constants/enums";


const TaskAddEditModal = ({ isEditable }) => {

    const isEditableContent = useSelector(state => state.general.editAbleContent);

    const [showStatusDropDown, setShowStatusDropDown] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(isEditableContent?.status || null);
    const [priorityContent, setPriorityContent] = useState(null);


    const titleRef = useRef();
    const descriptionRef = useRef();
    const teamRef = useRef();
    const assigneeRef = useRef();

    const dispatch = useDispatch();

    const changeCurrentStatus = (status) => {
        setCurrentStatus(status);
        setShowStatusDropDown(prev => !prev);
    }

    useEffect(() => {
        if (isEditable && isEditableContent.title && isEditableContent.description && isEditableContent.team && isEditableContent.assignee) {
            titleRef.current.value = isEditableContent.title;
            descriptionRef.current.value = isEditableContent.description;
            teamRef.current.value = isEditableContent.team;
            assigneeRef.current.value = isEditableContent.assignee;
        }
    }, []);

    const EditTask = () => {
        const actions = {
            id: isEditableContent.id,
            status: currentStatus,
            priority: priorityContent,
        }
        dispatch(editTask(actions))
        dispatch(toggleEditModal());
    }
    const AddTask = () => {
        const newTask = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            assignee: assigneeRef.current.value,
            priority: priorityContent || priorities.p0,
            team: titleRef.current.value,
        }
        dispatch(addTask(newTask));
        dispatch(toggleCreateModal());
    }

    return (
        <div className="w-screen h-screen absolute z-[100] top-0 left-0 bg-[#00000090] flex justify-center items-center">
            <form className="gradient-bg m-1">
                <div className="bg-white flex justify-between items-center p-2">
                    <h1 className="text-xl">
                        {isEditable ? "Edit Task" : "Create Task"}
                    </h1>
                    <button
                        onClick={
                            () => isEditable ? dispatch(toggleEditModal()) : dispatch(toggleCreateModal())
                        }
                        type="button"
                    >
                        <IoClose size={20} />
                    </button>
                </div>
                <div className="flex justify-between max-[470px]:flex-col max-[470px]:items-start gap-4 px-5 items-center py-2 flex-wrap" >
                    <label htmlFor="title">
                        Title:
                    </label>
                    <input
                        ref={titleRef} id="title"
                        disabled={isEditable}
                        type="text"
                        className="p-1 bg-[#ffffff80] border rounded-[4px] border-black w-[300px]"
                    />
                </div>
                <div className="flex justify-between max-[470px]:flex-col max-[470px]:items-start gap-4 px-5 items-center py-2 flex-wrap">
                    <label htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        ref={descriptionRef}
                        id="description"
                        disabled={isEditable}
                        className="p-1 bg-[#ffffff80] border rounded-[4px] border-black w-[300px] resize-none"
                    />
                </div>
                <div className="flex justify-between max-[470px]:flex-col max-[470px]:items-start gap-4 px-5 items-center py-2 flex-wrap">
                    <label htmlFor="">
                        Team:
                    </label>
                    <input
                        ref={teamRef}
                        id="team"
                        disabled={isEditable}
                        type="text"
                        className="p-1 bg-[#ffffff80] border rounded-[4px] border-black w-[300px]"
                    />
                </div>
                <div className="flex justify-between max-[470px]:flex-col max-[470px]:items-start gap-4 px-5 items-center py-2 flex-wrap">
                    <label htmlFor="">
                        Assignee:
                    </label>
                    <input
                        ref={assigneeRef} id="assignees"
                        disabled={isEditable}
                        type="text"
                        className="p-1 bg-[#ffffff80] border rounded-[4px] border-black w-[300px]"
                    />
                </div>
                <div className="flex justify-between max-[470px]:flex-col max-[470px]:items-start items-center flex-wrap">
                    <div className="flex  gap-8 px-5 items-center py-2" >
                        <label htmlFor="">
                            Priority:
                        </label>
                        <PriorityDropDown
                            setPriorityContent={setPriorityContent}
                            priorityContent={priorityContent}
                        />
                    </div>
                    {
                        isEditable && <div className="flex  gap-8 px-5 items-center py-2 relative">
                            <label htmlFor="">
                                Status:
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowStatusDropDown(prev => !prev)}
                                className="text-gray-400 sm:text-md text-sm flex justify-between bg-white  rounded-lg px-2 py-2 text-center items-center"
                            >
                                {currentStatus || "Status"}
                                <svg
                                    className="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {
                                showStatusDropDown ?
                                    <div
                                        id="dropdown"
                                        className="z-10  top-14 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44"
                                    >
                                        <ul className="py-2 text-sm text-gray-700" >
                                            <li
                                                onClick={() => changeCurrentStatus(status.pending)}
                                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                Pending
                                            </li>
                                            <li
                                                onClick={() => changeCurrentStatus(status.inProgress)}
                                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                In Progress
                                            </li>
                                            <li
                                                onClick={() => changeCurrentStatus(status.completed)}
                                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                Completed
                                            </li>
                                            <li
                                                onClick={() => changeCurrentStatus(status.deployed)}
                                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                Deployed
                                            </li>
                                            <li
                                                onClick={() => changeCurrentStatus(status.deffred)}
                                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                Deffered
                                            </li>
                                        </ul>
                                    </div> : null
                            }
                        </div>
                    }
                </div>
                <div className="flex justify-center py-2 px-5">
                    <button
                        type="button"
                        onClick={isEditable ? EditTask : AddTask}
                        className="bg-button-1 rounded-md text-white px-2 py-1 flex justify-center items-center md:text-lg text-md w-full"
                    >
                        {isEditable ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaskAddEditModal