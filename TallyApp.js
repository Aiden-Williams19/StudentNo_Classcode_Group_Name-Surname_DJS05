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


  // Scenario 1: Initial State Verification
console.log("SCENARIO 1: Initial State Verification");
console.log("Initial state:", store.getState());

// Scenario 2: Incrementing the Counter
console.log("\nSCENARIO 2: Incrementing the Counter");
store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'ADD' });

// Scenario 3: Decrementing the Counter
console.log("\nSCENARIO 3: Decrementing the Counter");
store.dispatch({ type: 'SUBTRACT' });

// Scenario 4: Resetting the Counter
console.log("\nSCENARIO 4: Resetting the Counter");
store.dispatch({ type: 'RESET' });
