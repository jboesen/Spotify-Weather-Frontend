import React from "react";
import { StyledList } from "./styles";

const ListView = ({ recs }) => (
    <StyledList className='list-content'>
        {recs.map((rec, idx) => {
            return (
                <a className='track-item' href={rec.uri}>
                    {/* item spacer is transparent and is used to right-align the indices */}
                    {idx !== 9 && <span className='item-spacer'>1</span>}
                    <span className='item-number'>{idx+1}</span>
                    <span className='track-info'>
                        <img class='track-img' src={rec.album.images[2].url} />
                        <span className='track-summary'>
                            <span className='track-name'>{rec.name}</span>
                            <span className='artist-name'>{rec.artists[0].name}</span>
                        </span>
                    </span>
                </a>
            )
        })}
    </StyledList>
);

export default ListView;