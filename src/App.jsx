import Navbar from "./components/Navbar.jsx";
import NoProjectSelected from "./components/NoProjectsSelected.jsx";
import NewProject from "./components/NewProject.jsx";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";
function App() {
  const [addProject, SetAddProject] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    SetAddProject((previousvalue => {
      const TaskId = Math.random();
      const newTask ={
        text:text,
        id: TaskId
      }
      return {
       ...previousvalue,
       tasks: [newTask, ...previousvalue.tasks]
      }
    }))
  }

  function handleDeleteTask(id){
    SetAddProject((previousvalue) => {
      return {
        ...previousvalue,
        tasks: previousvalue.tasks.filter((task)=> task.id != id)
      }
    });
  }

  function handleSelectProject(id){
    
    SetAddProject((previousvalue) => {
      return {
        ...previousvalue,
        tasks:[],
        selectedProjectID: id,
      }
    });
  }

  function handleDeleteProject(){
    SetAddProject((previousvalue) => {
      return {
        ...previousvalue,
        selectedProjectID: undefined,
        projects: previousvalue.projects.filter(
          (project)=> project.id != previousvalue.selectedProjectID
        )
      }
    });
  }

  const AddProject = () => {
    SetAddProject((previousvalue) => {
      return {
        ...previousvalue,
        selectedProjectID: null,
      }
    });
  }

  function handleCancelAddProject(){
    SetAddProject((previousvalue) => {
      return {
        ...previousvalue,
        selectedProjectID: undefined,
      }
    });
  }
  function handleAddedProject(projectData){
    SetAddProject((previousvalue => {
      const projectId = Math.random();
      const newproject ={
        ...projectData,
        id:projectId
      }
      return {
       ...previousvalue,
       selectedProjectID:undefined,
       projects: [...previousvalue.projects, newproject ]
      }
    }
  ));
  }

  const selectedProject = addProject.projects.find(p => p.id === addProject.selectedProjectID);
 
  
  let content = <SelectedProject onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} project={selectedProject} onDelete={handleDeleteProject} taskList={addProject.tasks}/>

  if(addProject.selectedProjectID === null){
    content = (<NewProject onAdd={handleAddedProject} onCancel={handleCancelAddProject}/>);

  }
  else if(addProject.selectedProjectID === undefined){
    content = <NoProjectSelected onStartAddProject={AddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Navbar onStartAddProject={AddProject} projects={addProject.projects} onSelectProject={handleSelectProject} selectedProjectId={addProject.selectedProjectID}/>
      {content}
    </main>
  );
}

export default App;
