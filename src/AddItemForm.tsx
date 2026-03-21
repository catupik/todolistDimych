import {type ChangeEvent, type KeyboardEvent, useState} from "react";

import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

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


    return <div style={{display: 'flex',  alignItems: 'center'}}>
        <TextField  variant="outlined"  value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? "error" : ""}
                   id="outlined-error-helper-text"
                   // label="Error"
                   defaultValue="Hello World"
                    error={!!error}
                   helperText={error}
        />

        <IconButton  onClick={addTask} color={'info'} sx={{ '&:focus': { outline: 'none' }, ml: '10px' }}>
            <AddIcon />
        </IconButton>





        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}