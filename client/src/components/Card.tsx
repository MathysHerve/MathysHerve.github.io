import React, { ReactNode } from 'react'
import './MainPage/MainPage.scss'

interface Props {
    imageUrl?: string;
    title: string;
    description: string;
    link: string;
    linktext: string;
}

const Card = ({imageUrl, title, description, link, linktext} : Props) => {
    const cardStyle = {
        height:'150px'
    }

    const hasimageUrl = imageUrl ? 1 : 0

    return (
        <>
            <div className="card h-100" style={cardStyle}>
                <img src={imageUrl} className="card-img-top " alt="..." style={{height: '150px', objectFit: 'cover' }}></img>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={link} className="btn btn-primary">{linktext}</a>
                </div>
            </div>
        </>
    )
}

export default Card