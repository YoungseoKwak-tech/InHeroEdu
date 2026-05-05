export function getAnthropicApiKey() {
  return process.env.ANTHROPIC_API_KEY?.trim() ?? "";
}

export function hasAnthropicApiKey() {
  return getAnthropicApiKey().length > 0;
}
