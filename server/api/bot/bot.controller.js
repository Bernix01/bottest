/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bot              ->  index
 * POST    /api/bot              ->  create
 * GET     /api/bot/:id          ->  show
 * PUT     /api/bot/:id          ->  upsert
 * PATCH   /api/bot/:id          ->  patch
 * DELETE  /api/bot/:id          ->  destroy
 */

'use strict';

// Gets a list of Bots
export function hook(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
     req.query['hub.verify_token'] === VALIDATION_TOKEN) {
   console.log("Validating webhook");
   return res.status(200).send(req.query['hub.challenge']);
 } else {
   console.error("Failed validation. Make sure the validation tokens match.");
   return res.sendStatus(403);          
 }
}
