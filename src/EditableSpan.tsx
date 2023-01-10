import { ChangeEvent, ChangeEventHandler, useState } from "react"

type SpanType = {
    Oldtitle: string
    callback: (newTitle: string) => void
}

const EditableSpan = (props: SpanType) => {
    const [edit, setEdit] = useState(false);
    let [newTitle, setNewTitle] = useState(props.Oldtitle);

    const onDoubleClickHandler = () => setEdit(!edit); /* props.callback(newTitle) */
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return ( <>
        {edit ? <input value={newTitle} onChange={onChangeHandler} onBlur={() => {
            props.callback(newTitle)
            setEdit(!edit)
            
        }} autoFocus/> 
    : <span onDoubleClick={onDoubleClickHandler}>
    {props.Oldtitle}
    </span>}
    </>
    )
}

export default EditableSpan;
