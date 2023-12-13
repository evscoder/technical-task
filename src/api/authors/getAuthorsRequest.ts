import axios from "axios";

const getAuthorsRequest = async () => {
    try {
        const {data} = await axios.get("/api/authors");

        return data;
    } catch(error) {
        throw new Error('Server error');
    }
};

export default getAuthorsRequest;
