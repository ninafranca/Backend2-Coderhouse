import fs from 'fs';

class TODOS {
    constructor(){
        this.todos = [];
    }

    list() {
        return this.todos;
    }

    add(title){
        let todo = {title,completed:false}
        this.todos.push(todo);
    }

    completeTodo(title) {
        if(this.todos.length===0) throw new Error('No tasks');
        let todoFound = false;
        this.todos.forEach(todo=>{
            if(todo.title===title){
                todo.completed=true;
                todoFound=true;
                return ;
            }
        })
        if(!todoFound) throw new Error('Task not found');
    }

    saveToFileCallback(cb){
        let fileContent = "";
        this.todos.forEach(todo=>{
            fileContent+=`${todo.title},${todo.completed}`
        })
        fs.writeFile('todos.txt',fileContent,cb);
    }
    
    saveToFilePromise(){
        let fileContent = "";
        this.todos.forEach(todo=>{
            fileContent+=`${todo.title},${todo.completed}`
        });
        return fs.promises.writeFile('todos.txt',fileContent);
    }}

    export default TODOS;