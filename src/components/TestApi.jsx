import React from 'react'

class TestApi extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {}
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        console.log('componentDidMount')
        fetch('https://swapi.co/api/people/1/')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    loading: false,
                    character: data
                })
                console.log('setState')
            })
    }

    render() {
        const text = this.state.loading ? 'loading...' : this.state.character.name
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }
}

export default TestApi
