import { LocalStorageService } from "@/services/localStorage.service";

// ---------------------------------- PRODUCTION --------------------------------

// export const environment = {
//     host: 'https://server-itw.koyeb.app/api/v1',
//     chathost: 'https://server-itw.koyeb.app',
//     header: {
//         "Content-Type": "application/json; charset=utf-8",
//         "Authorization": LocalStorageService.getSyncToken()?.access_token,
//     }
// };





// -------------------------------- DEPLOYMENT --------------------------------

export const environment = {
    host: 'http://localhost:8080/api/v1',
    header: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": LocalStorageService.getSyncToken()?.access_token,
    }
};

