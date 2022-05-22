const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form');
const search = document.getElementById('search')
const main = document.getElementById('main')


async function getUser(username) {
    try {
        const { data } = await axios.get(APIURL + username)
        createUserCard(data)
        
       
    } catch(err) {
        createErrorCard('No profile with this username')
    }   
}


async function getRepos(username) {
    try {
        const { data } = await axios.get(APIURL + username + '/repos?sort=created')
        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }   
}

function addReposToCard(repos) {
    const reposEl= document.getElementById('repos');
    repos
        .slice(0,10)
        .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repos')
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl)

    })
}


function createUserCard(user) {
    const profileAvatar = user.avatar_url;
    const myuser = user.name;
    console.log(myuser)
    const cardHTML= `<div class="card">
    <div>
        <img src="${profileAvatar}" alt="${myuser}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos">
            
        </div>
    </div>
    </div>`
    main.innerHTML = cardHTML
}

function createErrorCard(msg) {
    const cardHTML= `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `
    main.innerHTML = cardHTML;
}



form.addEventListener('submit',function(e){
    e.preventDefault()
    const user = search.value;
    if(user) {
        getUser(user)
        // getRepos(user)
    }
    search.value= '';
})

