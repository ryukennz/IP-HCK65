import axios from 'axios'
import { fetchCatSuccess } from './catSlice'

export const fetchDataCat = ()=>{
    return async(dispatch)=>{
      try {
        let { data } =await axios.get('http://localhost:3000/cats')
        dispatch(fetchCatSuccess(data))
      } catch (error) {
        console.log(error);
      }
    }
  }