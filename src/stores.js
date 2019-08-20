import { writable } from "svelte/store";
import defaultParadinhas from "./defaultParadinhas";

export const paradinhasStore = writable(
  localStorage.getItem("paradinhas")
    ? JSON.parse(localStorage.getItem("paradinhas"))
    : defaultParadinhas
);

export const escolhasStore = writable(
  localStorage.getItem("escolhas")
    ? JSON.parse(localStorage.getItem("escolhas"))
    : []
);

escolhasStore.subscribe(value => {
  localStorage.setItem("escolhas", JSON.stringify(value));
});

paradinhasStore.subscribe(value => {
  localStorage.setItem("paradinhas", JSON.stringify(value));
});
