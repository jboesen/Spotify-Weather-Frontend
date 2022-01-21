import React from "react";
import { StyledList } from "./styles";
import FadeIn from 'react-fade-in'

const ListView = ({ recs }) => {
    const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const ListContent = () => {
        try {
            return (recs.map((rec, idx) => {
                return (
                    <a key={idx} className='track-item' href={rec.uri}>
                        {/* item spacer is transparent and is used to right-align the indices */}
                        {idx !== 9 && <span className='item-spacer'>1</span>}
                        <span className='item-number'>{idx + 1}</span>
                        <span className='track-info'>
                            <img className='track-img' src={rec.album.images[2].url} />
                            <span className='track-summary'>
                                <span className='track-name'>{rec.name}</span>
                                <span className='artist-name'>{rec.artists[0].name}</span>
                            </span>
                        </span>
                    </a>
                )
            }));
        }
        catch (err) {
            return (dummy.map((_, idx) => {
                return (
                    <a key={idx} className='track-item'>
                        {/* item spacer is transparent and is used to right-align the indices */}
                        {idx !== 9 && <span className='item-spacer'>1</span>}
                        <span className='item-number'>{idx + 1}</span>
                    </a>
                )
            }));
        }
    }

    return (
        <StyledList className='list-content'>
            <FadeIn>
                {ListContent()}
            </FadeIn>
        </StyledList>
    );
}

export default ListView;