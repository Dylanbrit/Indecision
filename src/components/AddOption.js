import React from 'react'

class AddOption extends React.Component {
    state = {
        error: undefined
    }
    handleAddOption = (e) => {
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
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddOption