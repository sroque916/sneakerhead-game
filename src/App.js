import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import "./App.css";
import shoes from "./shoes.json";

function shuffleFriends(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

class App extends Component {
    // Set this.state
    state = {
        shoes,
        currentScore: 0,
        topScore: 0,
        rightWrong: "",
        clicked: [],
    };

    handleClick = id => {
        if (this.state.clicked.indexOf(id) === -1) {
            this.handleIncrement();
            this.setState({ clicked: this.state.clicked.concat(id) });
        } else {
            this.handleReset();
        }
    };

    handleIncrement = () => {
        const newScore = this.state.currentScore + 1;
        this.setState({
            currentScore: newScore,
        });
        if (newScore >= this.state.topScore) {
            this.setState({ topScore: newScore });
        }
        else if (newScore === 12) {
            this.setState({ rightWrong: "You win!" });
        }
        this.handleShuffle();
    };

    handleReset = () => {
        this.setState({
            currentScore: 0,
            topScore: this.state.topScore,
            rightWrong: "You Lost",
            clicked: []
        });
        this.handleShuffle();
    };

    handleShuffle = () => {
        let shuffledFriends = shuffleFriends(shoes);
        this.setState({ shoes: shuffledFriends });
    };




    render() {
        return (

            <Wrapper>
                <Nav
                    score={this.state.currentScore}
                    topScore={this.state.topScore}
                    rightWrong={this.state.rightWrong}
                />
                <Title>
                    SneakerHead Game!
                </Title>
                {this.state.shoes.map(shoe => (
                    <FriendCard
                        key={shoe.id}
                        image={shoe.image}
                        id={shoe.id}
                        handleClick={this.handleClick}
                        handleIncrement={this.handleIncrement}
                        handleShuffle={this.handleShuffle}
                        handleReset={this.handleReset}
                    />
                ))}

            </Wrapper>
        );
    }
}
export default App;