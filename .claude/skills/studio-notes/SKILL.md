---
name: studio-notes
description: Daily routine that publishes Chiara's new post-class journal pages as "Notes from the studio" posts and prepares the newsletter email for subscribers who opted in. Use when running the studio-notes routine or publishing a journal page by hand.
---

# Notes from the studio: daily routine

Chiara writes in a paper journal after each dance class. She photographs the
page and drops the photo into the Google Drive folder **"Studio notes"**
(in her My Drive). Once a day this routine turns every new photo into a post
on chiaralaurenza.com and prepares the newsletter email.

## 1. Find new pages

- Search Drive for images in the "Studio notes" folder
  (`parentId = '<folder id>' and mimeType contains 'image/'`).
- `notes/processed.json` maps each Drive file id to the post it became.
  Skip ids already listed. Nothing new: stop here, change nothing.
- Several photos taken on the same day for the same class are one post with
  several pages (order them by creation time).

## 2. Write the post

For each new post:

1. Download the photo(s). Strip all EXIF/location data, fix rotation, resize
   to 1050 px wide JPEG (quality ~82), save as
   `blog/images/<YYYY-MM-DD>-<slug>-page-<n>.jpg`.
2. Read the handwriting and transcribe it **faithfully**: her words, her
   order, her numbering. Fix only obvious spelling slips. Never add
   interpretation, never invent text you cannot read: write `[…]` instead.
3. Date: the date written on the page; otherwise the photo's date.
   Title: the class or workshop name from the page (e.g. "Contemporary open
   class"). Summary: one sentence, ideally her own first line or question.
4. Write `notes/<YYYY-MM-DD>-<slug>.json` (format in the docstring of
   `scripts/new_note.py`) and run `python3 scripts/new_note.py notes/<file>.json`.
   It creates the post page and adds it to blog.html, about.html and feed.xml.
5. Add the Drive file id(s) → slug to `notes/processed.json`.
6. If a page is mostly unreadable, or looks private (names of students,
   health details, anything not about the class), do not publish it: list it
   in the run summary for Chiara instead and still mark it in
   processed.json with `"skipped": "<reason>"`.

Commit to `main` with message `Notes from the studio: <title>` and push.
GitHub Pages publishes it within a couple of minutes.

## 3. Newsletter

Subscribers live in Chiara's Gmail as FormSubmit emails:

- Sign up: subject `Newsletter: new subscriber`, fields `Email`, `Topics`.
  They get studio notes if Topics contains `Notes from the studio` or `Everything`.
- Unsubscribe (from unsubscribe.html): subject `Newsletter: unsubscribe`,
  fields `Email`, `Stop` (`Notes from the studio` or `Everything`).
- For each address the newest message wins. Also honour plain replies that
  say "unsubscribe"/"abmelden"/"disiscrivi".

Build one email per new post (several posts the same day: one email):

- To: Chiara herself; **Bcc**: the opted-in addresses. Never put subscribers in To/Cc.
- Subject: `Notes from the studio: <title>`
- Body: the summary, the transcription, a link to the post, and at the end:
  "You get this because you chose Notes from the studio. Unsubscribe:
  https://chiaralaurenza.com/unsubscribe.html"
- Write it in English (the site's main language).

**Sending mode: draft.** Create a Gmail draft and do not send it; Chiara
reviews and presses Send. Only send directly if Chiara has changed this line
to "Sending mode: automatic".

No opted-in subscribers: skip the email and say so in the run summary.

## 4. Run summary

End with a short summary: posts published (with links), pages skipped and
why, whether a draft was created and for how many subscribers.
