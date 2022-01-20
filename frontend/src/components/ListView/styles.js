import styled from "styled-components";

export const StyledList = styled.div`

    font-family: 'Helvetica Neue', sans-serif;
    background-color: #121212;
    margin: 10px 5vw;
    padding: 30px 0px;
    border-radius: 25px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);

    .track-item {
        background-color: #121212;
        color: #b3b3b3;
        padding: 1em 1.5em;
        text-align: left;
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        transition: background-color 0.3s;

        .item-number {
            padding-right: 3em;
            font-size: 1.1em;
        }
        .item-spacer {
            color: transparent;
            font-size: 1.1em;
        }

        .track-info {
            display: flex;
            flex-direction: row;
            .track-img {
                width: 40px;
                height: 40px;
                margin-right: 1em;
            }
            .track-summary {
                display: flex;
                flex-direction: column;
                justify-content: center;

                .track-name {
                    color: white;
                    margin-bottom: 0.2em;
                    font-size: 1.1em;
                }

                .artist-name {
                    font-size: 1em;
                }
            }
        }
    }

    .track-item:hover {
        background-color: #313131;
    }
`