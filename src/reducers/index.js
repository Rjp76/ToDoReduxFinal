function todoApp(state,action){
    switch (action.type){
        case 'ADD_TODO':
            var newState = Object.assign({},state);
            newState.todo.items.push({
                message: action.message,
                completed: false
            });
    }
}