/* eslint-disable react/prop-types */


import { useRef } from "react"
import { IoClose } from "react-icons/io5"

const DateRangeModal = ({ setStartDate, setEndDate, setshowDateRangeModal }) => {

    const startDateRef = useRef();
    const endDateRef = useRef();

    return (
        <div className="flex items-center justify-center absolute inset-0 bg-[#00000090] z-[100]">
            <div className="bg-white flex items-center p-5 flex-col">
                <div className="w-full bg-white flex justify-between items-center p-2 gap-10">
                    <h1 className="text-xl">
                        Select Range
                    </h1>
                    <button
                        type="button"
                        onClick={() => setshowDateRangeModal(prev => !prev)}
                    >
                        <IoClose size={20} />
                    </button>
                </div>
                <div className="my-2 flex gap-5 items-center">
                    <input
                        ref={startDateRef}
                        onChange={() => setStartDate(new Date(startDateRef.current.value))}
                        type="date"
                        className="px-5 py-2 bg-gray-300 rounded-lg"
                    />
                    <span>
                        to
                    </span>
                    <input
                        ref={endDateRef}
                        onChange={() => setEndDate(new Date(endDateRef.current.value))}
                        type="date"
                        className="px-5 py-2 bg-gray-300 rounded-lg"
                    />
                </div>
                <button
                    onClick={() => setshowDateRangeModal(prev => !prev)}
                    className="bg-button-1 px-5 py-2 rounded-lg font-medium text-white"
                >
                    Apply
                </button>
            </div>
        </div>
    )
}

export default DateRangeModal