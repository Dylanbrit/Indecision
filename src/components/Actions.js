import React from 'react'

class Actions extends React.Component {
    render() {
        return (
            <div>
                <button className="big-button" onClick={this.props.handlePick}>What Should I Do?</button>
            </div>
        )
    }
}

export default Actions