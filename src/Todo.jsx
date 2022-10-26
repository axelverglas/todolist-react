import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
    li: `flex justify-between p-4 my-2 bg-slate-200 rounded`,
    liComplete: `flex justify-between p-4 my-2 bg-slate-400 rounded`,
    row: `flex items-center`,
    text: `ml-4 text-gray-700 cursor-pointer`,
    textComplete: 'ml-4 line-through cursor-pointer',
    button: 'cursor-pointer flex items-center',
}

function todo({todo, toggleComplete, removeTodo}) {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
        <div className={style.row}>
            <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''}/>
            <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
        </div>
        <button onClick={() => removeTodo(todo.id)}>{<FaRegTrashAlt/>}</button>
    </li>
  )
}

export default todo