'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [products, setProducts] = useState(null);
  const supabase = createClient();

  // Estado para guardar el criterio de búsqueda
  const [search, setSearch] = useState('');

  const getData = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${search}%`);
  
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setProducts(data);
    }
  };
  
  useEffect(() => {
    getData();
  }, [search]); // Agrega 'search' como dependencia para que se actualice cuando cambie

  function handleSubmit(e) {
    e.preventDefault();
    //la búsqueda se realiza automáticamente cuando cambia 'search'
  }

  return (
    <div className='py-6'>
      <h1 className='font-bold text-center text-lg'>PRODUCTOS</h1>
      <form className='text-center mt-3 text-black' onSubmit={handleSubmit}>
        <input
          placeholder='buscar...'
          className='border rounded px-2'
          defaultValue={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          type='submit'
          className='rounded-md bg-sky-400 px-3 ml-3'
          onClick={() => {
            // Realizar la búsqueda aquí:)
            getData();
          }}
        >
          Buscar
        </button>
      </form>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 py-4'>
  {products?.map((product) => (
    <div key={product.id} className='border rounded-lg overflow-hidden bg-white'>
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
        <p className='text-gray-700 mb-2'>{product.description}</p>
        <p className='text-green-600 font-semibold'>Price: ${product.price}</p>
        <p className='text-gray-500'>{product.additional_field}</p>
      </div>
    </div>
  ))}
</ul>
    </div>
  );
}
