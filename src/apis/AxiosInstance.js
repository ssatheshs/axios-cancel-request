import axios from "axios"

export const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const getReq = async (source) => {
    try {
      const { data } = await instance.get("/posts/1", {
        cancelToken: source.token,
      })
      return data;
    } catch (err) {
      if (axios.isCancel(err)) {
        return "axios request cancelled"
      }
      return err
    }
}