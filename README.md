# Investment Platform Demo (Next.js + Payload CMS)

This is a self-hosted demo using **Next.js 15** and **Payload CMS 3.0** in a single repository.

## Features
- **Frontend**: Next.js App Router (located in `app/(app)`)
- **CMS**: Payload CMS (located in `app/(payload)`)
- **Database**: SQLite (stored locally as `payload.db` - no setup required)
- **Localization**: Enabled for English and Spanish.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000/admin](http://localhost:3000/admin) to create your first user (Admin).

4.  **Create Content**:
    -   Go to **Pages** and create a page with the slug `home`. Publish it.
    -   Go to **Posts** and create some blog posts.
    -   Use the "Locales" switch in the admin top-right to add Spanish content.

5.  View the Frontend:
    -   Homepage: [http://localhost:3000](http://localhost:3000)
    -   Blog: [http://localhost:3000/blog](http://localhost:3000/blog)

## Project Structure
-   `payload.config.ts`: CMS Configuration (Collections, DB, Plugins).
-   `collections/`: Schema definitions for Pages and Posts.
-   `app/(app)`: The public-facing website.
-   `app/(payload)`: The CMS admin and API routes.
