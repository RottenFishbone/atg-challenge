const apiRoot = 'http://localhost:8000/v1/movies'

export async function search(title, year, page) {
  let url = `${apiRoot}/search?q=${title}&`;
  if (year != null) {
    url = `${url}year=${year}&`;
  }
  if (page != null) {
    url = `${url}page=${page}&`;
  }

  const resp = await fetch(url);
  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(resp.statusText);
}

export async function getSaved() {
  let url = `${apiRoot}/saved`;
  const resp = await fetch(url);

  if (resp.ok) {
    return await resp.json();
  }
  throw new Error(resp.statusText);
}

async function lookupId(id) {
  let url = `${apiRoot}/search?id=${id}&`;
  const resp = await fetch(url);
  if (resp.ok) {
    return await resp.json();
  }
}

export async function postSaved(id) {
  let movie = await lookupId(id);
  
  let url = `${apiRoot}/saved`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: movie,
  });
  if (resp.ok){
    return true;
  } else if (resp.status == 403){
    return false;
  }

  throw new Error(resp.statusText);
}

export async function deleteSaved(id) {
  let url = `${apiRoot}/saved?id=${id}`;
  const resp = await fetch(url, {method: 'DELETE'});
  if (resp.ok) {
    return;
  }

  throw new Error(resp.statusText);

}
