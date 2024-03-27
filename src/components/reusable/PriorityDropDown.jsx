/* eslint-disable react/prop-types */

import { useState } from "react";
import { priorities } from '../../constants/enums'

const PriorityDropDownItem = ({ title, onClick }) => {
    return (
        <li
            onClick={onClick}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
            {title}
        </li>
    )
}

const PriorityDropDown = ({ priorityContent, setPriorityContent }) => {
    const [showDropDown, setShowDropDown] = useState(false);

    const togglePriority = () => {
        setShowDropDown(prev => !prev);
    }
    const selectPriority = (data) => {
        setPriorityContent(data);
        setShowDropDown(prev => !prev);
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={togglePriority}
                className="text-gray-400 sm:text-md text-sm flex justify-between bg-white  rounded-lg px-2 py-2 text-center w-[90px]  items-center  "
            >
                {priorityContent || "Priority"}
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
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
                showDropDown
                    ? <div
                        id="dropdown"
                        className="z-[1000]  top-12 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                    >
                        <ul
                            className="py-2 text-sm text-gray-700"
                        >
                            <PriorityDropDownItem
                                title={"No Priority"}
                                onClick={() => selectPriority(null)}
                            />
                            <PriorityDropDownItem
                                title={priorities.p0}
                                onClick={() => selectPriority(priorities.p0)}
                            />
                            <PriorityDropDownItem
                                title={priorities.p1}
                                onClick={() => selectPriority(priorities.p1)}
                            />
                            <PriorityDropDownItem
                                title={priorities.p2}
                                onClick={() => selectPriority(priorities.p2)}
                            />
                        </ul>
                    </div> : null
            }
        </div>
    )
}

export default PriorityDropDown




