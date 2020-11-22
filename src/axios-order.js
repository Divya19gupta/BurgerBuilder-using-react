import axios from 'axios';

const Instance = axios.create({
    baseURL:'https://react-burgerbuilder-d18ca.firebaseio.com/'
});

export default Instance;