# Firestore is the only source of truth

## Problem

A recommendation and its narrative are read from more than one screen, and the narrative is written after the request returns. Keeping that state in `sessionStorage` ties it to one browser session. A second tab, a later visit, or a finished narrative has no shared record, so the screens can disagree.

## Decision

Firestore is the only source of truth. The browser does not store the recommendation or the narrative in `sessionStorage`. It reads and writes that state in Firestore.

## Cost

The client needs Firestore to show or save a recommendation and a narrative. There is no local session copy to fall back on, and a write waits on Firestore instead of completing inside the browser tab.
