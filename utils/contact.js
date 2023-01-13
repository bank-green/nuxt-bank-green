
import { post } from "./backend";

export function submitContact(form) {
  return post("/submitContact", form);
}
