// cambiar a false o true si quieren usar heroku o no
const use_heroku = false ;



const url = use_heroku ? 'https://redex-backend.herokuapp.com/' : 'http://10.101.57.59:5000/';

export default url;
