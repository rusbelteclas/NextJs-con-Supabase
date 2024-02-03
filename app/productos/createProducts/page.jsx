'use client'
//Implementar vista con el formulario para registrar prducto
//name, price, description 

import { useState } from "react";

export default function (CreateProducts) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    
    //estado de errores 
    const [errors, setErrors] = useState({});

    function saveProduct(form) {
        //evitar el submit
        form.preventDefault();

        //realizar la validacion
        console.log("validar");
        
        let errorList = [];

        if (!name) {//SI nombre no tiene valor
            errorList.name = 'Nombre es obligatorio';
            
        }
        if (!price) {//SI precio no tiene valor
            errorList.price = 'Precio es obligatorio';
            
        }
        if (!description) {//SI descripcion no tiene valor
            errorList.description = 'Descripcion es obligatorio';
        
        }

        if (Object.keys(errorList).length > 0) {
            //hay errores, mostrarlos al usuario
            setErrors(errorList);
            //evitar que se envie el formulario
            return
        }
    }
    return(
        <form className="flex flex-col gap-3 mt-8">
        <div className="flex flex-col gap-1">
            <label className="text-white">Nombre</label>
            <input
            name="name"
            placeholder="Nombre del producto"
            className="text-black border border-gray-800 rounded p-2"
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-white">Price</label>
            <input 
            name="price"
            placeholder="precio"
            className="text-black border border-gray-800 rounded p-2"
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className="text-white" >description</label>
            <input
            name="description"
            placeholder="descripcion del producto"
            className="text-black border border-gray-800 rounded p-2"
            />
        </div>
        <div>
            <label>additional_field</label>
        </div>
        <button 
        type="submit"
        className="border rounded-lg bg-sky-600 p-2 text-lg"
        value={name}
        onChange={(e) => {
            setName(e.target.value);
        }}
        >
        </button>
    </form> 
    )   
}