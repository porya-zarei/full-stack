# Server Document

## Add new Collection

1) first add data type to "types/data.ts" file
2) add type schema and model in "server/mongoose/models.ts" file
3) add connections you want to mongo database in "server/mongoose/functions.ts" with MDB suffix at the end of the functions name
4) add actions you want and main logics in "server/actions/type-name.ts" file
5) add controller for your data in "server/controllers/type-name.ts" file
6) add controllers in "pages/api/type-name/[slug].ts" file
7) add routes you have for your controllers in "server/constants/routes.ts"
8) in client add your connections to api in "services/type-name.ts" file

