const DEFAULT_STORAGE_UPLOAD_LIMIT_BYTES = 9 * 1024 * 1024 * 1024;

function parseUploadLimit(raw: string | undefined) {
  if (!raw) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return Math.floor(parsed);
}

export function getStorageUploadLimitBytes() {
  return (
    parseUploadLimit(process.env.NEXT_PUBLIC_STORAGE_UPLOAD_LIMIT_BYTES) ??
    DEFAULT_STORAGE_UPLOAD_LIMIT_BYTES
  );
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

export function formatStorageUploadLimit(bytes = getStorageUploadLimitBytes()) {
  const gb = 1024 * 1024 * 1024;
  const mb = 1024 * 1024;

  if (bytes >= gb) {
    return `${formatNumber(bytes / gb)}GB`;
  }

  return `${formatNumber(bytes / mb)}MB`;
}
