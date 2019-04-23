import React, {Component} from 'react';

import './App.css';
import ActivityList from "./components/ActivityList";

const API_URL               = 'https://api.runningheroes.com';
const DEFAULT_RESULT_LIMIT  = 10;

// URL: ${API_URL}/v3/users/56c35408de31c6b954b81080/activities
// Method: GET
// Type: application/json
// QueryString :
// {
//   limit : 10,
//   sort: '-date',
//   skip: 0
// }



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultLimit: DEFAULT_RESULT_LIMIT
        }
    }

    onClickSeeMore = () => {
        this.setState(prevState=> ({
            resultLimit: prevState.resultLimit + 10,
        }));
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">Activités</header>
                <div className="App-content" >
                    <ActivityList limit={this.state.resultLimit}/>
                </div>
                <div className="App-more" onClick={this.onClickSeeMore}>Voir plus</div>
            </div>
        );
    }
}


export default App;
