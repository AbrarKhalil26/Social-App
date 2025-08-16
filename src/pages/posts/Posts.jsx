import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

export default function Posts() {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  async function getPosts(){
    // return await axios.get(`https://fakestoreapi.com/products`, )
  }

  return (
    <div className='m-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {isError && <p>Error: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {
        data && data.data.map((post) => (
          <div key={post.id} className='border p-4 rounded'>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Price: ${post.price}</p>
            <img src={post.image} alt={post.title} style={{width: '100px'}} />
          </div>
        ))
      }
    </div>
  )
}
