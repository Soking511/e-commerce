declare module '*.html' {
  const content: string;
  export default content;
}

declare module './emailComponent' {
  export function greet(): void;
}

declare module 'sharp';
