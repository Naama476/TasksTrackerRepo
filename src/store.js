import { observable, action, makeObservable, computed, toJS } from "mobx";
import React from "react";
import { isConstructorDeclaration } from "typescript";

class TasksStore {
  tasks = [
    {
      user: "naama",
      userTasks: [
        {
          id: 1,
          text: "Clean the room",
          date: "2023-03-06",
          time: "12:00",
          priority: "low",
          protect: false,
          complited: false
        },
        {
          id: 2,
          text: "Security info lab",
          date: "2023-03-08",
          time: "12:00",
          priority: "meduim",
          protect: true,
          complited: true
        },
        {
          id: 3,
          text: "Watch social network lecture",
          date: "2023-03-14",
          time: "12:00",
          priority: "high",
          protect: true,
          complited: false
        }
      ]
    },
    {
      user: "Naftali",
      userTasks: [
        {
          id: 1,
          text: "Clean the room",
          date: "28.3.2023",
          time: "12:00",
          priority: "low",
          protect: false,
          complited: false
        }
      ]
    }
  ];
  currentUser = "";
  currentSearch="";
  filteredTasks=[];
  userTasks = [];
  constructor() {
    makeObservable(this, {
      tasks: observable,
      currentUser: observable,
      currentSearch: observable,
      userTasks: observable,
      filteredTasks: observable,
      getUsersTasks: computed,
      getCompletedCount: computed, //for Stat component
      getSortByName: computed,
      getSortByDate: computed,
      getSearchedTask: computed,
      addTodo: action,
      onDelete: action,
      onEdit: action,
      logIn: action,
      onSearch: action,
      updateComplited: action,
      //   showCompleted: action
    });
  }

  onSearch(searchVal){
    console.log("onSearch works", searchVal)
    this.currentSearch = searchVal;
    this.getSearchedTask; 
  } 
  

  onEdit(id, textE, dateE, timeE, priorityE, protectE) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].user === this.currentUser) {
        const taskToUpdate = this.tasks[i].userTasks.find(
          (task) => task.id === id
        );
        const updatedTask = {
          ...taskToUpdate,
          text: textE,
          date: dateE,
          time: timeE,
          priority: priorityE,
          protect: protectE
        };
        const updatedTasks = this.tasks[i].userTasks.map((task) =>
          task.id === taskToUpdate.id ? { ...task, ...updatedTask } : task
        );
        this.tasks[i].userTasks = updatedTasks;
      }
    }
  }
  updateComplited(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].user === this.currentUser) {
        const taskToUpdate = this.tasks[i].userTasks.find(
          (task) => task.id === id
        );
        const updatedTask = {
          ...taskToUpdate,
          complited: !taskToUpdate["complited"]
        };
        const updatedTasks = this.tasks[i].userTasks.map((task) =>
          task.id === taskToUpdate.id ? { ...task, ...updatedTask } : task
        );
        this.tasks[i].userTasks = updatedTasks;
      }
    }
  }

  addTodo(task) {
    this.tasks.forEach((data) => {
      if (data.user === this.currentUser) {
        data.userTasks.push(task);
      }
    });
  }
  onDelete(taskToDel, user) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].user === user) {
        this.tasks[i].userTasks = this.tasks[i].userTasks.filter(
          (task) => task.id !== taskToDel.id
        );
      }
    }
  }
  logIn(userName) {
    // 1. get user list
    const users = [];
    this.tasks.forEach((data) => {
      users.push(data.user);
    });
    // 2. check if currunt user in users
    if (users.includes(userName)) {
      this.currentUser = userName;
      this.isLogged = true;
      return true;
    }
    this.isLogged = false;
    return false;
  }

  logOut() {
    this.isLogged = false;
  }

  get getUsersTasks() {
    const userTask = this.tasks.find((data) => data.user === this.currentUser);
    return userTask ? userTask.userTasks : [];
  }

  get getCompletedCount() {
    const uTasks = this.getUsersTasks;
    const countComp = uTasks.filter((task) => task.complited === false).length;
    return countComp;
  }

  get getSortByName() {
    const userTask = this.tasks.find((data) => data.user === this.currentUser);
    const tasks = Array.from(userTask.userTasks);
    const TaskByName = tasks.sort(function (x, y) {
      let a = x.text.toUpperCase(),
        b = y.text.toUpperCase();
      console.log("a", a);
      console.log("b", b);
      return a === b ? 0 : a < b ? -1 : 1;
    });
    return TaskByName;
  }

  get getSortByDate() {
    const userTask = this.tasks.find((data) => data.user === this.currentUser);
    const tasks = Array.from(userTask.userTasks);
    const TaskByDate = tasks.sort(function (x, y) {
      let a = new Date(x.date),
        b = new Date(y.date);
      return a - b;
    });
    return TaskByDate;
  }

  get getSearchedTask(){
    const userTask = this.getUsersTasks;
    this.filteredTasks = userTask.filter((task) => {
    return task.text.toLowerCase().includes(this.currentSearch.toLowerCase());
    });
    console.log(this.filteredTasks);
    return this.filteredTasks; 
  }

  get getSortByPriority() {
    const userTask = this.tasks.find((data) => data.user === this.currentUser);
    const tasks = Array.from(userTask.userTasks);
    const highTasks = [];
    const meduimTasks = [];
    const lowTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].priority === "high") {
        highTasks.push(tasks[i]);
      }
      if (tasks[i].priority === "meduim") {
        meduimTasks.push(tasks[i]);
      }
      if (tasks[i].priority === "low") {
        lowTasks.push(tasks[i]);
      }
    }
    const TaskByPriority = [...highTasks, ...meduimTasks, ...lowTasks];
    return TaskByPriority;
  }
}

const tasksStore = new TasksStore();
export default tasksStore;
