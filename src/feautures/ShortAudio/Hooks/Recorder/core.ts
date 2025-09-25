let mediaRecorder: MediaRecorder | null = null;
let chunks: BlobPart[] = [];
let timer: number | null = null;
let startTs = 0;

export function supportedMime(): string {
  const c = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/ogg'
  ];
  return c.find(t => MediaRecorder.isTypeSupported(t)) || '';
}

export function getRecorder() { return mediaRecorder; }
export function setRecorder(r: MediaRecorder | null) { mediaRecorder = r; }
export function resetChunks() { chunks = []; }
export function pushChunk(b: BlobPart) { if (b && (b as Blob).size !== 0) chunks.push(b); }
export function buildBlob(type?: string) { return new Blob(chunks, { type }); }

export function setStartTs(t: number) { startTs = t; }
export function nowElapsed() { return Date.now() - startTs; }

export function setupTick(cb: () => void) {
  clearTick();
  timer = window.setInterval(cb, 200);
}
export function clearTick() {
  if (timer !== null) {
    window.clearInterval(timer);
    timer = null;
  }
}
