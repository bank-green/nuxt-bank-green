export async function submitContact(form: object) {
  const response = await $fetch('/api/contact', { method: 'POST', body: form })
  return response
}
