import NewTask from "./components/NewTask";

export default function Tasks({ tasks, handleAddTask, handleDeleteTask }) {
    return (<section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">TASKS</h2>
        <NewTask onClick={handleAddTask} />
        {tasks.length === 0 && (
            <p className=" text-stone-800 my-4">This project does not have any tasks yet.</p>
        )}
        {tasks.length > 0 &&
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {tasks.map((taskItem) => (
                    <li key={taskItem.id} className="flex justify-between my-4">
                        <span>{taskItem.text}</span>
                        <button className="text-stone-700 hover:text-red-500" onClick={()=>{handleDeleteTask(taskItem.id)}}>Clear</button>
                    </li>
                ))}
            </ul>
        }

    </section>);
}