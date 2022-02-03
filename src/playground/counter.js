class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props)
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
        this.state = {
            visibility: false,
            buttonText: 'Show Details',
            text: 'Here are some details'
        }
    }
    handleToggleVisibility() {
        this.setState(() => {
            if (this.state.visibility === false) {
                return {
                    visibility: true,
                    buttonText: 'Hide Details'
                }
            } else if (this.state.visibility === true) {
                return {
                    visibility: false,
                    buttonText: 'Show Details'
                }
            }
        })
    }
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                    <button onClick={this.handleToggleVisibility}>{this.state.buttonText}</button>
                    {this.state.visibility === true && <p>{this.state.text}</p>}
            </div>
        )
    }
}
 
const app = document.querySelector('#app')
 
ReactDOM.render(<VisibilityToggle />, app)