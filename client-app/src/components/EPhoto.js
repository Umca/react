import React, { Component } from 'react'

const EMOTIONS_TO_EMOJI_MAPPER = {
    anger: '😡',
    contempt: '😀',
    disgust: '🤮',
    fear: '🙀',
    happiness: '😂',
    neutral: '😐',
    sadness: '☹️',
    surprise: '😲'
};

export const EPhoto = ({url, emojify, emotions = []}) => {
    const faces = emotions.map(singleFace => {
        const { faceRectangle: { height, top, left }, scores } = singleFace
        const topEmotionScore = Math.max(...Object.values(scores))
        const topEmotion = Object.entries(scores).find(
            ([key, value]) => value === topEmotionScore
        )[0];
        return {
            emoji: EMOTIONS_TO_EMOJI_MAPPER[topEmotion],
            left,
            top,
            fontSize: height
        };
    })
    return (
        <div style={{ position: 'relative', transform: 'scale(0.7)'}} class="image__wrapper">
            {
                faces.map( (props, i) => {
                    const { top, left, fontSize } = props
                    return (
                        <span key={i} className="ephoto" style={{ left, top, fontSize }}>
                            {props.emoji}
                        </span>
                    );
                })
            }    
            <img alt="" src = {url} /> 
            <button
                className="button"    
                onClick = {() => emojify(url)}
            >Emojify me!</button>
        </div>    
    )
}