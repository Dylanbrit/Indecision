import React from 'react'
import AddOption from './AddOption'
import Actions from './Actions'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'

class Indecision extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    closeModal = () => {
        this.setState((previousState) => {
            return {
                selectedOption: undefined
            }
        })
    }
    handleRemoveAll = () => {
        this.setState(() => {
            return {
                options: []
            }
        })
    }
    handleDelete = (optionToDelete) => {
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
    handlePick = () => {
        const option = Math.floor(Math.random() * this.state.options.length)
        const num = this.state.options[option]
        this.setState((previousState) => {
            return {
                selectedOption: num
            }
        })
    }
    handleAddOption = (optionText) => {
        if (!optionText) {
            return 'Please enter an option'
        } else if (this.state.options.indexOf(optionText) > -1) {
            return 'Please enter a new option'
        }

        this.setState((previousState) => {
            return {
                options: previousState.options.concat(optionText)
            }
        })
    }
    componentDidMount() {
        const data = localStorage.getItem('options')
        const options = JSON.parse(data)
        if (options) {
            this.setState(() => {
                return {
                    options: options
                }
            })
        }
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
    render() {
        const subtitle = 'Put your life in the hands of a computer!'

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Actions handlePick={this.handlePick} />
                    <div className="widget">
                        <Options options={this.state.options} handleDelete={this.handleDelete} handleRemoveAll={this.handleRemoveAll} />
                        <AddOption handleAddOption={this.handleAddOption} options={this.state.options} />
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption} closeModal={this.closeModal} />
            </div>
        )
    }
}

export default Indecision