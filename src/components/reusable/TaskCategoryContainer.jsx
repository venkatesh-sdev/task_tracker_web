/* eslint-disable react/prop-types */
import TaskCard from "./TaskCard"



const TaskCategoryContainer = ({ title, color, tasks }) => {

    return <div className={`md:min-w-[250px] min-w-[300px] min-h-[450px] max-h-[450px] overflow-y-scroll rounded-lg bg-white mx-2`}>
        {/* Category Title */}
        <h1 className={`sticky z-[100] top-0 ${color} w-full rounded-t-lg b p-2 text-white font-medium text-md text-center`}>
            {title}
        </h1>
        {/* Category List */}
        <div className="px-2 pb-2">
            {
                tasks.length === 0 ?
                    <div className="flex justify-center mt-44"> No Tasks Yet</div>
                    :
                    tasks.map(
                        task => <TaskCard task={task} key={task.id} />
                    )
            }
        </div>
    </div>
}


export default TaskCategoryContainer