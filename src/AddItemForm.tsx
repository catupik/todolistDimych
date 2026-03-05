import {type ChangeEvent, type KeyboardEvent, useState} from "react";

type AddItemsFormPropType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemsFormPropType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
            setTitle('')
        }
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }


    return <div>

        <input
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}