import { useState } from "react";
import Avatar from "./Avatar";
import { Student as StudentProps } from "./types";


export default function Student(props: StudentProps & { onRemoveStudent: (id: string) => void}) {
    const { id, name, onRemoveStudent } = props

    const [showRemove, setShowRemove] = useState(false)
    const updateShowState = () => {
        setShowRemove(true);
    };

    return (
        <div onMouseOver={updateShowState} 
            onMouseLeave={() => setShowRemove(false)}>
            <Avatar name={name}/>
            <p className='student-name'>{name}</p>
            { showRemove ? (
                <button type="button" onClick={() => onRemoveStudent(id)}>Slett</button>
            ) : null }
        </div>
    );
    /*
        Her syns ikke button lenger når mus ikke er over div-en, 
        Det er *ikke* som å sette display: none; -> hele button elementet fjernes.
        Hvis vi tenker på accessibility, så vil ikke en screenReader vite at knappen fins.
        Her kan det være lurt å lage "Accessibility Only" funksjonalitet
    */
}