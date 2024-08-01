import react from "react";

const TaskItem = (props) => {
  return (
    <div key={props.tasks.id} className="task-item-container">
      <div className="text-content">
        <div className="task-card">
          <h1 className="task">{props.entries.task}</h1>

          <button onClick={showHideHelp} className="help-button">
            Help
            <div id="help" className="help">
              <img src={props.instructions} />
            </div>
          </button>
        </div>
      </div>
      <div className="actions"></div>
    </div>
  );

  //   return <div className="Task-list-wrapper">{taskList}</div>;
};
export default TaskItem;
function showHideHelp() {
  var help = document.getElementById("help");
  help.classList.toggle("show");
}
