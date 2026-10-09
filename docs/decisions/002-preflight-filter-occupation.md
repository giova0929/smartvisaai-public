# The preflight filter strips an unconfirmed occupation

## Problem

An occupation the applicant has not confirmed can be sent to `POST /api/recommendation` as if it were settled. The rules engine and the language model then treat that occupation as part of the request.

## Decision

Before `POST /api/recommendation`, `stripUnconfirmedOccupation` removes `occupation` unless `confirmed === true`. The function returns a new object and does not change the input. The implementation and tests live in [examples/preflight-filter/](../../examples/preflight-filter/).

## Cost

Until the applicant confirms an occupation, that field is left out of the request. Callers must use the returned object. The function does not update the original value in place.
