
import "./index.css"
import React, { ChangeEvent, FC } from 'react';

interface InputProps {
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  value: string;
  id?:string;
  
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void

}
const Input:FC<InputProps> = ({label, name, value, id, placeholder,onChange, type="text"}) => {
  return (
   
    <div className='container'>
	<label> {label} </label>
	<input type={type} placeholder={placeholder} name={name} id={id} value={value}  onChange={onChange} />
</div>
        
   
  );
}


export default Input;

    