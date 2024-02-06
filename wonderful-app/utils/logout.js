import Cookies from 'js-cookie';

const logout = async () => {
    try{
   Cookies.remove("token")
   Cookies.remove("picture")

    }catch(e){
        console.log(e)
    }
}

export default logout