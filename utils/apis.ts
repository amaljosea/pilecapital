const get = (route: string) => () => fetch(route).then((res) => res.json());
const post = (route: string) => (data: any) =>
  fetch(route, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const apis = {
  get,
  post,
};
