import React, { ReactNode, useContext } from 'react'
import { DarkModeContext } from '../pages/MainPage/DarkmodeContext';

interface Props {
    imageUrl?: string;
    title: string;
    description: string;
    link: string;
    linktext: string;
    customCardClass?: string;
    customDescriptionClass?: string;
    customImageClass?: string;
}

const Card = ({imageUrl, title, description, link, linktext, customCardClass, customDescriptionClass, customImageClass} : Props) => {
    const cardStyle = {
        height:'150px',
    }

    const hasimageUrl = imageUrl ? 1 : 0
    const darkMode = useContext(DarkModeContext);

    return (
        <>
            <div className={"card h-100 " + customCardClass + " " + (darkMode ? 'text-bg-dark' : '')} style={cardStyle}>
                <img src={imageUrl} className={"card-img-top " + customImageClass} alt="..." style={{height: '150px', objectFit: 'contain' }}></img>
                <div className="card-body ">
                    <h5 className="card-title">{title}</h5>
                    <p className={"card-text " + customDescriptionClass}>{description}</p>
                    <a href={link} className="btn btn-primary">{linktext}</a>
                </div>
            </div>
        </>
    )
}

export default Card