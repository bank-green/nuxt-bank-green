export async function submitContact(form: Object) {
  const response = await $fetch("/api/contact", { method: "POST", body: form });
  return response;
}
