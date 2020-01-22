/*проверяем ответы АПИ что бы определить статус ответа.Если 401 - не авторизован, 403- запрещен, то пользователь автоматически выходит из приложения .
если ответ содержит ошибку, то возвращается сообщение об ошибке , если все прошло удачно, то возвращаем данные в объекте json*/
//author///service

import {authenticationServise} from "./athentication";

export function handleResponse(response){
    return response.text().then(text=>{
        const data = text && JSON.parse(text);
        if(!response.ok){
            if([401,403].indexOf(response.status)!==-1)
            {
                authenticationServise.logout();
                window.location.reload(true);
            }
            const error = (data && data.message)||response.statusText;
            return Promise.reject(error);

        }
        return data;
    })
}