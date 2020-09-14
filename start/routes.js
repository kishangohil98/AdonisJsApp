"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", ({ response }) => {
  response.send("Get API Called");
  console.log("Get API Called");
});
Route.get("/api/store", "StoreController.index");

Route.post("/api/store", "StoreController.store");
Route.delete("/api/store/:id", "StoreController.delete");
