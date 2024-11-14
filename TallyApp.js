// Store implementation
function createStore(reducer) {
    let state;
    let listeners = [];
  
    // Method to get current state
    const getState = () => state;
  
    // Method to dispatch actions and update state
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  
    // Method to subscribe to state changes
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };

     // Initialize the state
  dispatch({ type: '@@INIT' });

  return { getState, dispatch, subscribe };
}


// Reducer function
function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
      case 'ADD':
        return { count: state.count + 1 };
      case 'SUBTRACT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        return state;
    }
  }
  
  // Initialize store
  const store = createStore(counterReducer);
  
  // Log state changes to console
  store.subscribe(() => console.log('State:', store.getState()));

