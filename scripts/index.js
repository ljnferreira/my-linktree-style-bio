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
      let icon = document.createElement('i');
      let text = document.createElement('span');

      icon.classList.add('fab');
      icon.classList.add('fa-github');

      text.classList.add('link-span')

      text.innerText = repo.name;
      link.href = repo.url;
      
      link.appendChild(icon);
      link.appendChild(text);
      projects.appendChild(link);
    }
  );
}

addProjectLinks();


