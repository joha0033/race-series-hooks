import React, {
  createContext,
  useReducer,
  useContext,
} from 'react';
import './App.css';
import data from './data'
// create "join" table
// Array.prototype.joinWith = function (that, by, select, omit) {
//   var together = [], length = 0;
//   if (select) select.map(function (x) { select[x] = 1; });
//   function fields(it) {
//     var f = {}, k;
//     for (k in it) {
//       if (!select) { f[k] = 1; continue; }
//       if (omit ? !select[k] : select[k]) f[k] = 1;
//     }
//     return f;
//   }
//   function add(it) {
//     var pkey = '.' + it[by], pobj = {};
//     if (!together[pkey]) return together[pkey] = pobj,
//       together[length++] = pobj;
//     pobj = together[pkey];
//     for (var k in fields(it))
//       pobj[k] = it[k];
//   }
//   this.map(add);
//   that.map(add);
//   return together;
// }


const AppProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

const useAdmin = () => {
  const contextValue = useContext(AppContext);
  return contextValue;
}

const AppContext = createContext(null)

const Header = ({ children }) => (
  <div className={'header'}>
    {children}
  </div>
)

const Navigation = ({ children }) => (
  <div className={'navigation'}>
    {children}
  </div>
)

const Footer = ({ children }) => (
  <div className={'footer center-content'}>
    {children}
  </div>
)

const Main = () => (
  <div className={'main'}>
    <ListContainer />
  </div>
)

const ListContainer = () => (
  <div className={'list-container'}>
    {console.log('LIST CONTAINER')}
    <List />
  </div>
)

const ListDetail = () => (
  <div className={'title'}>
    {'Details'}
  </div>
)

const ListData = ({ display }) => {
  console.log('LIST DATA');

  return !display ? null :
    data.series.data[display].map((el, i) => {
      return (
        <li
          key={el + i}
          className={'list-item'}
        >
          {el.name}
        </li>
      )
    })
}

const List = () => {
  const [state, dispatch] = useAdmin()
  console.log('LIST');

  return state.isAuthenticated
    ? (
      <div className={'list-data-container'}>
        <div className={'list-data'}>
          <div className={'title'}>
            {state.view}
          </div>
          <ListData display={state.view} />
        </div>
        <div className={'list-detail-container'}>
          <ListDetail display={state.view} className={'list-detail'} />
        </div>
      </div>
    )
    : (
      <div className={'list-login-container'}>
        <AdminForm />
      </div>)
}

const NavigationCategories = () => {
  const [context, dispatch] = useAdmin(AppContext)

  const displayList = (e) => {
    const categoryClicked = e.getAttribute('data-name')

    return dispatch({
      type: 'SET_DISPLAY_LIST',
      view: categoryClicked
    })
  }

  const startShake = () => dispatch({
    type: 'START_SHAKE'
  })

  const stopShake = () =>
    setTimeout(() =>
      dispatch({
        type: 'STOP_SHAKE'
      }), 500)

  const toggleShake = () => {
    startShake()
    return stopShake()
  }

  return (
    <div>
      <h3 className={'title'}>
        Categories
      </h3>
      <div>
        {context.categories.map((el, i) => (
          <div
            key={el + i}
            data-name={el}
            className={context.isAuthenticated
              ? 'list-item'
              : 'disabled'}
            onClick={context.isAuthenticated
              ? (event) => displayList(event.target) // we'll implement this later 
              : () => toggleShake()}>
            {el}
          </div>
        ))}
      </div>
    </div>
  )
}

const AdminForm = () => {
  const [state, dispatch] = useAdmin(AppContext)
  console.log('ADMIN FORM');

  const handleSubmit = (event, toggleAuth) => {
    event.preventDefault();
    return dispatch({ type: 'IS_AUTHENTICATED' })
  }

  return (
    < div className={
      state.shake
        ? 'shake-it form-container'
        : 'form-container'
    }>
      <form
        onSubmit={event => handleSubmit(event)}
        className={'center-content login-form'}>
        <div>
          <h2
            className={'title center-content'}>
            Admin Login
          </h2>
          <label htmlFor='email'>Email: </label>
          <input
            className={'custom-input'}
            name='email'
            type='email' required />
          <button
            className={'submit-button'}>
            Submit
          </button>
        </div>
      </form>
    </div >
  )
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'IS_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: true
      }
    case 'START_SHAKE':
      return {
        ...state,
        shake: true
      }
    case 'STOP_SHAKE':
      return {
        ...state,
        shake: false
      }
    case 'SET_DISPLAY_LIST':
      return {
        ...state,
        view: action.view
      }
    default: return state
  }
}

const initialState = {
  isAuthenticated: false,
  shake: false,
  categories: ['participants', 'races'],
  view: null
}

const App = () => {
  return (
    <div className={'App'}>
      <Header>
        <h3 className={'title'}>Use Reducer - Admin Access</h3>
      </Header>
      <AppProvider>
        <Navigation className={'navigation'}>
          <NavigationCategories />
        </Navigation>
        <Main />
      </AppProvider>
      <Footer>
        We should add Context!
      </Footer >
    </div >
  )
}



// function initRedux(reducer, initialState) {
//   const StateContext = createContext(null)
//   const DispatchContext = createContext(null)
//   console.log('initRedux');

//   function Provider(props) {
//     const [appState, dispatch] = useReducer(reducer, initialState)
//     console.log('Provider', appState);
//     return (
//       <StateContext.Provider value={appState}>
//         <DispatchContext.Provider value={dispatch}>
//           {props.children}
//         </DispatchContext.Provider>
//       </StateContext.Provider>
//     )
//   }

//   function useRedux(extractState, actionMap) {
//     const appState = useContext(StateContext)
//     const dispatch = useContext(DispatchContext)

//     const stateExtract = extractState(appState)
//     // console.log(stateExtract, 'APP STATE!');
//     const actions = Object.keys(actionMap).reduce((acc, key) => {
//       const actionCreator = actionMap[key]
//       const fn = (...args) => {
//         const action = actionCreator(...args)
//         if (typeof action === 'function') {
//           action(dispatch, () => appState)
//         } else {
//           dispatch(action)
//         }
//       }
//       return { ...acc, [key]: fn }
//     }, {})

//     return [stateExtract, actions]
//   }
//   return { Provider, useRedux }
// }

export default App