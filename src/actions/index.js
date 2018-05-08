export function addTodo(message){
    return {
        type: 'ADD_TODO', //called by reducer
        message:message, //item to do
        completed:false //done yet?
    };
}
export function completeTodo(index){
  return{
      type:'COMPLETE_TODO',
      index:index //which one is completed?
  };
}
export function deleteTodo(index){
    return{
        type:'DELETE_TODO',
        index:index //which one do we delete
    };
}
export function clearTodo(){
    return{
        type:'CLEAR_TODO'
    };
}
