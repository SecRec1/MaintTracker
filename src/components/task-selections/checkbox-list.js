import React from "react";
import axios from "axios";

const TaskOptions = (props) => {
  const tasks = props.items;
  const records = _.map(tasks, (task) => {
    return task;
  });
  const list = records.map((tasks) => {
    return (
      <option key={tasks.id} value={tasks.id}>
        {tasks.job}
      </option>
    );
  });
  return list;
};
export default TaskOptions;
