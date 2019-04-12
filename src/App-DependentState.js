import React, { Component, createContext } from 'react';
import './App.css';
import data from './data'

const AdminContext = createContext(null)
const ShakeContext = createContext(null)

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

const Main = (props) => (
  <div className={'main'}>
    {/* // Main hires a Component Mule (ListContainer) to smuggle data */}
    <ListContainer
      isAuthenticated={props.isAuthenticated}
      toggleAuth={props.toggleAuth}
    // shake={props.shake}
    />
  </div>
)

const ListContainer = (props) => (
  <div className={'list-container'}>
    {/* // ListContainer hires a Component Mule (ListDisplay) to smuggle data */}
    <ListDisplay
      isAuthenticated={props.isAuthenticated}
      toggleAuth={props.toggleAuth}
    // shake={props.shake}
    />
  </div>
)

const ListDisplay = (props) => (
  <div className={'list-display'}>
    {/* // ListDisplay hires a Component Mule (List) to smuggle data */}
    <List
      isAuthenticated={props.isAuthenticated}
      toggleAuth={props.toggleAuth}
    // shake={props.shake}
    />
  </div>)

const List = ({ isAuthenticated, toggleAuth, shake }) => (
  isAuthenticated
    ? (
      <div className={'title'} >
        "secure" list, check.
        {console.log(data)}
      </div >)
    : (
      <div className={'list-login-container'}>
        {/* // And List hires a Component Mule (AdminForm) to smuggle data */}
        <AdminForm />
      </div>)
)

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, toggleAuth) {
    event.preventDefault();
    return toggleAuth(true)
  }

  render() {
    return (
      <ShakeContext.Consumer>
        {shake => (
          <AdminContext.Consumer>
            {state => (
              < div className={
                shake()
                  ? 'shake-it form-container'
                  : 'form-container'
              } >
                <form
                  onSubmit={event => this.handleSubmit(event, state.toggleAuth)}
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
            )}
          </AdminContext.Consumer>
        )}
      </ShakeContext.Consumer>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: ['Participants', 'Races'],
      isAuthenticated: false,
      shake: false,
    }
    this.toggleAuth = this.toggleAuth.bind(this)
    this.toggleShake = this.toggleShake.bind(this)
  }

  shake() {
    return this.state.shake
  }

  toggleAuth(isAuthenticated) {
    this.setState({ isAuthenticated: true })
  }

  toggleShake() {
    return this.setState({ shake: true },
      state => setTimeout(() => this.setState(state => ({ shake: false })), 500))
  }

  render() {
    return (
      <div className={'App'}>
        <Header>
          <h3 className={'title'}>No Context - Admin Access</h3>
        </Header>

        <Navigation className={'navigation'}>
          <h3 className={'title'}>
            Categories
          </h3>
          <div>
            {this.state.categories.map((el, i) => (
              <div
                key={el + i}
                className={this.state.isAuthenticated
                  ? 'list-item'
                  : 'disabled'}
                onClick={this.state.isAuthenticated
                  ? () => null // we'll implement this later 
                  : () => this.toggleShake()}>
                {el}
              </div>
            ))}
          </div>
        </Navigation>
        <ShakeContext.Provider value={() => this.shake()}>
          <AdminContext.Provider value={this.state}>
            <Main
              isAuthenticated={this.state.isAuthenticated}
              toggleAuth={this.toggleAuth}
            // shake={this.state.shake}
            />
          </AdminContext.Provider>
        </ShakeContext.Provider>



        <Footer>
          We should add Context!
        </Footer >
      </div >
    )
  }
}

export default App