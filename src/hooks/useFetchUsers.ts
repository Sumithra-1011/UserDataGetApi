import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


// Define the User interface for user data
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
}

const useFetchUsers = ()=> useQuery<User[],Error>({
  queryKey:['posts'],
  queryFn:()=>axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.data)
})
export default useFetchUsers;

