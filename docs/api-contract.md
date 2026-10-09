# API contract example

This example is invented for the public portfolio. It is not taken from the private application. The `narrativeStatus` values `pending`, `ready`, and `failed` are illustrative.

## POST /api/recommendation

The browser sends the applicant's answers. The response carries a recommendation summary. The narrative is written asynchronously, so `narrativeStatus` shows whether that narrative is still pending, ready, or failed.

### Request

```http
POST /api/recommendation
Content-Type: application/json
```

```json
{
  "applicant": {
    "givenName": "Example",
    "occupation": {
      "label": "Example occupation",
      "confirmed": true
    }
  }
}
```

`stripUnconfirmedOccupation` removes `occupation` before this request unless `confirmed` is `true`. See the [decision record](decisions/002-preflight-filter-occupation.md).

### Illustrative responses

These three bodies show the same invented recommendation. Only `narrativeStatus` and the narrative fields change.

#### pending

The narrative has not been written yet.

```json
{
  "recommendationId": "example-001",
  "summary": "Example recommendation summary.",
  "narrativeStatus": "pending",
  "narrative": null
}
```

#### ready

The narrative is available to read.

```json
{
  "recommendationId": "example-001",
  "summary": "Example recommendation summary.",
  "narrativeStatus": "ready",
  "narrative": "Example narrative text."
}
```

#### failed

The narrative was not written. The recommendation summary is still present.

```json
{
  "recommendationId": "example-001",
  "summary": "Example recommendation summary.",
  "narrativeStatus": "failed",
  "narrative": null
}
```
