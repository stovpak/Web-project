/* функция возвращающая заголовок авторизации НТТР , которая содержит джейсонвебтокен текущего пользователя ,
который  вошел в систему, Если же пользователь не вошел в систему , возвращаем пустой объект .
 */
import {authenticationServise} from "./athentication";
export function authHeader()
{
    const currentUser= authenticationServise.currentUserValue;
    if(currentUser && currentUser.token)
    {
        //ретерним заголовок токена
        return {Authorization:'Bearer ${currentUser.token}'};
    }
    else {
        return{};
    }
}