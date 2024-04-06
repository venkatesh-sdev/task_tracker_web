/* eslint-disable react/prop-types */

import { useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleEditModal } from "../../context/reducers/generalReducer";
import { categoriesTasks, deleteTask } from "../../context/reducers/tasksReducer";

const TaskCard = ({ task }) => {

    const [showDropDown, setShowDropDown] = useState(false)

    const { title, description, priority, assignee, status, id } = task;

    const dispatch = useDispatch();

    const toggleDropDown = () => {
        setShowDropDown(prev => !prev);
    }

    const editActionHandler = () => {
        dispatch(toggleEditModal(task));
        toggleDropDown();
    }

    const deleteActionHandler = () => {
        dispatch(deleteTask(id));
        dispatch(categoriesTasks());
        toggleDropDown();
    }


    return <div className="bg-gray-200 rounded-lg p-2 mt-5">
        <div className="flex justify-between items-center">
            <h1 className="text-md font-medium">
                {title}
            </h1>
            <h2 className="bg-button-1 rounded-sm text-white px-2 py-1 flex justify-center items-center text-sm">
                {priority}
            </h2>
        </div>
        <div className="h-[1.2px] w-full bg-black mt-3 mb-2" />
        <p className="text-[13px] text-justify">
            {description}
        </p>
        <div className="flex justify-between items-center my-2">
            <h1 className="max-w-[150px] overflow-hidden text-ellipsis text-md">
                @{assignee}
            </h1>
            <div className="relative">
                <button
                    onClick={toggleDropDown}
                    className="bg-button-1 rounded-sm text-white px-2 py-1 flex justify-center items-center text-sm z-0"
                >
                    <IoEllipsisVerticalSharp />
                </button>
                {
                    showDropDown
                        ? <div
                            id="dropdown"
                            className="z-10 right-6 top-6 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44 overflow-hidden"
                        >
                            <ul className="text-sm text-gray-700" >
                                {
                                    status === 'Completed' ?
                                        <li className="flex justify-around px-4 py-2 bg-blue-500 cursor-pointer items-center text-white">
                                            Task Completed
                                        </li> : <>
                                            <li
                                                onClick={editActionHandler}
                                                className="flex justify-around px-4 py-2 hover:bg-blue-500 cursor-pointer items-center hover:text-white"
                                            >
                                                Edit <MdEdit />
                                            </li>
                                            <li
                                                onClick={deleteActionHandler}
                                                className=" px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer flex justify-around items-center "
                                            >
                                                Delete <MdDelete />
                                            </li>
                                        </>
                                }
                            </ul>
                        </div> : null
                }
            </div>
        </div>
        <button className="bg-button-1 text-sm text-white w-24 py-1 rounded-md font-medium mb-1">{status == 'Pending' ? 'Assign' : status}</button>
    </div>
}

export default TaskCard