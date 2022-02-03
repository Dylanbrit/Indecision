import React from 'react'

class Option extends React.Component {
    render() {
        // To call handleDelete, the function needs to know which item we want to delete, so we need to pass it in as an argument
        // We can't call handleDelete and pass the function in normally, or it will get called as soon as the page loads, which we don't want
        // So we get a little creative and we create a function that calls handleDelete for us, passing in our argument
        // The argument is this.props.optionText, since this is an individual item mapped out in the parent Component, it will automatically pass in the one that was clicked
        return (
            <div className="option">
                <p className={"option__text"}>{this.props.count}. {this.props.optionText}</p>
                <button className="button button--link" onClick={(e) => {
                    this.props.handleDelete(this.props.optionText)
                }}>Remove</button>
            </div>
        )
    }
}
export default Option