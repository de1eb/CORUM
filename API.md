# CORUM API docs

## API server

---

| Method | URL                | Body                                                               | response                                                                                                                                                                                                                            |
| ------ | ------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /                  | null                                                               | `CORUM PROJECT START`                                                                                                                                                                                                               |
| POST   | /api/auth/register | `{"userId": "codestates","nickname": "dalsoo","password": "0000"}` | `{"userImage":"../nori.png","userId":"codestates","nickname":"dalsoo","password":"733f5257115570034dd0c18216d813d253f804dd92790df604e65ff499a8924f","updatedAt":"2019-09-07T14:57:56.146Z","createdAt":"2019-09-07T14:57:56.146Z"}` |
| POST   | /api/auth/login    | `{"userId": "codestates","password": "0000"}`                      | `{"message":"LOGIN SUCCESS","token":"eyJhbG"}`                                                                                                                                                                                      |
| GET    | /api/auth/check    | null                                                               | `{"success":true,"info":{"userId":"codestates","password":"0000"}}`                                                                                                                                                                 |
| POST   | /api/auth/logout   | null                                                               | null                                                                                                                                                                                                                                |

---
