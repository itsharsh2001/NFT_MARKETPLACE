import React from "react";

import classes from "./Updates.module.css";

function Updates() {
    return (
        <div className={classes.updates}>
            <span>
                <h1>Get the Lastest
                    Rarible Updates</h1>
                <p>Sign up to our regular newsletter for news, insight,
                    new product releases & more.</p>
                <div>
                    <input type="email" name="email" id="email" placeholder="Input Email Address" />
                    <button>Get In Touch</button>
                </div>
            </span>
            <span>
                <h4>Maybe your question is have been
                    answered, check this out!</h4>
                <details>
                    <summary>What is Enefty?</summary>
                    <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                </details>
                <details>
                    <summary>How to Buy it?</summary>
                    <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                </details>
                <details>
                    <summary>How to Bid an item?</summary>
                    <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                </details>
            </span>
        </div>
    );
}

export default Updates;
