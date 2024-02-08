import React, { ReactNode } from 'react'

interface Props {
    children?: ReactNode;
    title: string;
    customClass?: string;
    customTextClass?: string;
}

const CardContainer = ({children, title, customClass, customTextClass}: Props) => {

  return (

    <div className={"card-container " + customClass}>
        <h3 className={customTextClass}>{title}</h3>
        {children ? <div className={"row row-cols-1 row-cols-md-4 g-4 "}>
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