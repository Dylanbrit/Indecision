class Meals extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleRemoveAll = this.handleRemoveAll.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.state = {
            options: []
        }
    }
    componentDidMount() {
        const data = localStorage.getItem('options')
        const options = JSON.parse(data)
        this.setState(() => {
            return {
                options: options
            }
        })
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }
    componentWillUnmount() {
        console.log('working')
    }
    handleRemoveAll() {
        this.setState(() => {
            return {
                options: []
            }
        })
    }
    handleDelete(optionToDelete) {
        this.setState((previousState) => {
            return {
                // Quite simply, we want to filter out the optin that was passed in, which is the one we clicked on
                // We use filter to return only the items to options that was not selected, so anything that is not equal to the argument passed in
                options: previousState.options.filter((option) => {
                    return optionToDelete !== option
                })
            }
        })
    }
    handlePick() {
        const option = Math.floor(Math.random() * this.state.options.length)
        const num = this.state.options[option]
        alert(num)
    }
    handleAddOption(optionText) {
        if (!optionText) {
            return 'Please enter a meal'
        } else if (this.state.options.indexOf(optionText) > -1) {
            return 'Please enter a new meal'
        }

        this.setState((previousState) => {
            return {
                options: previousState.options.concat(optionText)
            }
        })
    }
    handleFilter(input) {
        this.setState((previousState) => {
            return {
                options: previousState.options.filter((option) => {
                    return option.toLowerCase().includes(input.toLowerCase())
                })
            }
        })
    }
    render() {
        const subtitle = 'Plan your meal options'

        return (
            <div>
                <Header subtitle={subtitle} />
                <Actions handleRemoveAll={this.handleRemoveAll} handlePick={this.handlePick} />
                <Options options={this.state.options} handleDelete={this.handleDelete} />
                <AddOption handleAddOption={this.handleAddOption} />
                <Filter handleFilter={this.handleFilter} options={this.state.options} />
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}

Header.defaultProps = {
    title: 'Meal Options'
}

class Actions extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handlePick}>Pick a Meal</button>
                <button onClick={this.props.handleRemoveAll}>Remove All Meals</button>
            </div>
        )
    }
}

class Options extends React.Component {
    render() {
        return (
            <div>
                {this.props.options.map((option) => {
                    return <Option key={option} optionText={option} handleDelete={this.props.handleDelete} />
                })}
            </div>
        )
    }
}

class Option extends React.Component {
    render() {
        // To call handleDelete, the function needs to know which item we want to delete, so we need to pass it in as an argument
        // We can't call handleDelete and pass the function in normally, or it will get called as soon as the page loads, which we don't want
        // So we get a little creative and we create a function that calls handleDelete for us, passing in our argument
        // The argument is this.props.optionText, since this is an individual item mapped out in the parent Component, it will automatically pass in the one that was clicked
        return (
            <div>
                {this.props.optionText}
                <button onClick={(e) => {
                    this.props.handleDelete(this.props.optionText)
                }}>Remove</button>
            </div>
        )
    }
}

class AddOption extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        // We create a state for our error because our error will change depending on the situation
        // We start off leaving it undefined so that if there is no error than nothing will happen
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        // We keep handleAddOption here as well as up top because this function is responsible for capturing the text entered and preventing default
        // These are things that could not be done in the parent Component so we do them down here, then just use this function to call the one in the main Component
        const text = e.target.elements.option.value.trim()
        // We return the result from calling handleAddOption, passing in the text that was typed into input
        // Once called, a conditional will run up top that checks to see if no text was entered or if the text is the same as one already entered
        // If one of those things is true, an error is returned and is then updated as the error state
        // We create a <p> tag containing the error right above the form
        // If we try again and no error is returned, nothing appears as the state goes back to being undefined
        this.setState(() => {
            return {
                error: this.props.handleAddOption(text)
            }
        })

        e.target.elements.option.value = ''

        e.preventDefault()
    }
    render() {
        return (
            <div>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

class Filter extends React.Component {
    render() {
        return (
            <div>
                <h3>Search Meals</h3>
                <input type="text" onChange={(e) => {
                    this.props.handleFilter(e.target.value)
                }} />
            </div>
        )
    }
}

const app = document.querySelector('#app')

ReactDOM.render(<Meals />, app)