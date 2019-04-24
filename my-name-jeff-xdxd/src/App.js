import React from 'react';
import logo from './logo.svg';
import './App.css';
//
// function App() {
//   return (
//     <div>
//         ohfoashfao
//     </div>
//   );
// }

class Square extends React.Component {
    constructor() { 
        super();
        this.state = { 
            isHidden: true,
            value: '1'
        }
    }
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        return (
            <div className="card" onClick={this.toggleHidden.bind(this)} >
                {this.state.isHidden && this.state.value}
            </div>
        )
    }
}


export default Square;
