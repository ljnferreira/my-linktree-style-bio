let myHeaders = new Headers();

let fetchInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

async function getReposData(endpoint) {
  let data;
  await fetch(endpoint, fetchInit)
  .then((response) => {
    return response.json();
  })
  .then((repos) => {
    data = repos.map((repo) => {
      return {
        name: repo.name,
        url: repo.html_url
      }
    });
  });
  return data;
}



async function addProjectLinks(){
  let projects = document.querySelector('.projects');
  let endpoint = "https://api.github.com/users/ljnferreira/repos";
  let githubData = await getReposData(endpoint);
  githubData.map(
    (repo) =>{
      let link = document.createElement('a');
      link.href = repo.url;
      link.innerText = repo.name;
      projects.appendChild(link);
    }
  );
}

addProjectLinks();


