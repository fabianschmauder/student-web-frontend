import React from "react";
import './Card.css'

export default function Card({student}) {
    return <div className={"card"}>
        {student.name}
    </div>
}
