const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
function generateRandom(len) {
    const ascii = [];
    for (let i = 0; i < len/2; i++) {
        ascii.push(Math.floor(Math.random() * 94
        ) + 33);
    }
    ascii.push(...ascii);
    // Adapting the Durstenfield shuffle algorithm I found online
    for (let i = len - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ascii[i], ascii[j]] = [ascii[j], ascii[i]];
    }
    return String.fromCharCode(...ascii);
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: Array(props.len).fill(null)
        };
    };
    splitBoard(sub){
      return(<tr>{sub}</tr>);
    }

    //this.state.cards.slice(i)

    generateBoard() {
        let x = generateRandom(this.state.cards.length);
        let build = [];
        let y = 0;
        let sub = [];
        for (let i = 0; i < x.length+1; i++) {
          if(y === 2){
            build.push(this.splitBoard(sub));
            y = 0;
            sub = []
          }
          y++;
          sub.push(<Square isHidden={false} value={x[i]}/>);

        }
        return build;

    }

    handleChange(evt) {
      if (+evt.target.value % 2 === 0 && +evt.target.value >= 4) {
        this.setState({cards: Array(+evt.target.value).fill(null)});
      }
      //Set default to 4 if invalid input
      else {
        this.setState({cards: Array(4).fill(null)});

      }

    }
    render(){
        return (
            <div>
              Enter number of cards:<br></br>(Default and Minimum of 4 cards/Must be even number!)
             <input type="text" name="" onChange={this.handleChange.bind(this)}/>
              <table>
                  <tbody>
                      <tr>
                        {this.generateBoard()}
                      </tr>
                  </tbody>
              </table>
          </div>
        );
    }
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: props.isHidden,
            value: props.value
        }
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        return (
            <td className="card" onClick={this.toggleHidden.bind(this)} >
                {this.state.isHidden && this.props.value}
            </td>
        )
    }
}

export default Board

// ReactDOM.render(<Board len={4}/>, document.getElementById('main'));
