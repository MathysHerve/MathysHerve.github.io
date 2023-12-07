import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    title: string;
}

const CardContainer = ({children, title}: Props) => {

  return (

    <div className="card-container">
        <h3>{title}</h3>
        {children ? <div className="row row-cols-1 row-cols-md-4 g-4">
            {React.Children.map(children, (child, index) => (
                <div className="col" key={index}>
                {child}
                </div>
            ))}
        </div> : <p>Someone... is still working on this</p>}
    </div>

  )
}

export default CardContainer