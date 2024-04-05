/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// React Imports
import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";

// Icons
import { CiCalendar } from "react-icons/ci";

import {
    PriorityDropDown,
    TaskAddEditModal,
    DateRangeModal,
    TaskCategoryContainer
} from '../index';

// State Management
import {
    categoriesTasks,
    getAllFilterTasks,
    getAllTasks,
    getCompletedTasks,
    getDefferdTasks,
    getDeployedTasks,
    getInProgressTasks,
    getIsFilterApplied,
    getPendingTasks,
    resetTasks,
} from "../../context/reducers/tasksReducer";
import {
    getIsCreateModalOpen,
    getIsEditModalOpen,
    toggleCreateModal,
} from "../../context/reducers/generalReducer";


const Tasks = () => {

    // Local States
    const [filterPriorityContent, setFilterPriorityContent] = useState(null);
    const [showDateRangeModal, setshowDateRangeModal] = useState(false);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    //  Third Party Hook for State Management
    const dispatch = useDispatch();

    // Global State Datas
    const tasks = useSelector(getAllTasks);
    const isEditModalOpen = useSelector(getIsEditModalOpen);
    const isCreateModalOpen = useSelector(getIsCreateModalOpen);
    const pendingTasks = useSelector(getPendingTasks);
    const completedTasks = useSelector(getCompletedTasks);
    const inProgressTasks = useSelector(getInProgressTasks);
    const deployedTasks = useSelector(getDeployedTasks);
    const defferedTasks = useSelector(getDefferdTasks);
    const isFilterApplied = useSelector(getIsFilterApplied);

    // Reference for Filter 
    const filterAssigneeRef = useRef();

    // To Triger a Add Filter Event
    const addFilter = () => {
        !isFilterApplied ?
            dispatch(
                getAllFilterTasks(
                    {
                        assigneeName: filterAssigneeRef.current.value,
                        priority: filterPriorityContent,
                        startDate: startDate ? new Date(startDate) : '',
                        endDate: endDate ? new Date(endDate) : ''
                    }
                )
            ) :
            dispatch(resetTasks())
    }

    // useEffect for categories tasks
    useEffect(() => {
        dispatch(categoriesTasks());
    }, [tasks])


    return (
        <section className="2xl:mx-20 lg:mx-10 md:mx-10 mx-2 p-2 border-[3px] border-white rounded-lg">

            {/* Filter and Create New Task */}
            <div className="flex items-center justify-between flex-wrap">

                {/* Filter */}
                <div className="flex md:gap-5 gap-2 items-center flex-wrap">

                    <h1 className="font-medium md:text-xl text-sm">Filter By: </h1>

                    {/* Assignee Name Filter */}
                    <input ref={filterAssigneeRef} type="text" placeholder="Assignee Name" className="p-2 rounded-lg md:w-36 w-[100px] sm:text-md text-sm" />

                    {/* Priority Filter */}
                    <PriorityDropDown priorityContent={filterPriorityContent} setPriorityContent={setFilterPriorityContent} />

                    {/* DateFilter */}
                    <div onClick={() => setshowDateRangeModal(prev => !prev)} htmlFor="datepickerid" className='bg-white rounded-lg p-2 text-gray-400 flex gap-2 items-center cursor-pointer sm:text-md text-sm'>
                        {new Date(startDate).toDateString() || "DD/MM/YY"}
                        <span className="hidden md:inline"> - {new Date(endDate).toDateString() || "DD/MM/YY"}</span>
                        <CiCalendar className="text-gray-500 sm:text-md text-sm" size={20} />
                    </div>
                    {
                        showDateRangeModal && <DateRangeModal setStartDate={setStartDate} setEndDate={setEndDate} setshowDateRangeModal={setshowDateRangeModal} />
                    }

                    {/* Filter Button */}
                    <button onClick={addFilter} className="bg-button-1  text-white px-3 py-1 rounded-md font-medium ">
                        {isFilterApplied ? "x" : "Apply"}
                    </button>
                </div>

                {/* Create Task Button */}
                <button onClick={() => dispatch(toggleCreateModal())} className="bg-button-1  text-white px-20 py-2 rounded-md font-medium mt-2">Add New Task</button>

            </div>

            {/* Priority Button */}
            <div className="max-md:hidden flex items-center gap-7 my-5">
                {/* <h1 className="font-medium  md:text-xl text-sm">Sort By: </h1>
                <PriorityDropDown priorityContent={sortPriorityContent} setPriorityContent={setSortPriorityContent} /> */}
            </div>

            {/* Tasks List */}
            <div className="max-md:mt-5 w-full flex items-center overflow-x-scroll">
                <TaskCategoryContainer color={'bg-gray-500'} title={'Pending'} tasks={pendingTasks} />
                <TaskCategoryContainer color={'bg-yellow-600'} title={'In Progress'} tasks={inProgressTasks} />
                <TaskCategoryContainer color={'bg-green-600'} title={'Completed'} tasks={completedTasks} />
                <TaskCategoryContainer color={'bg-blue-950'} title={'Deployed'} tasks={deployedTasks} />
                <TaskCategoryContainer color={'bg-red-300'} title={'Deffered'} tasks={defferedTasks} />
            </div>

            {/* Create Task Modal */}
            {
                isCreateModalOpen && <TaskAddEditModal isEditable={false} />
            }

            {/* Editabler Modal */}
            {
                isEditModalOpen && <TaskAddEditModal isEditable={true} />
            }

        </section>
    )
}

export default Tasks


