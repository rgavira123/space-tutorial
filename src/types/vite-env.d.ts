/// <reference types="vite/client" />

// This declaration ensures TS understands Vite's enhanced ImportMeta
interface ImportMetaEnv {
  // Define custom env vars if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
