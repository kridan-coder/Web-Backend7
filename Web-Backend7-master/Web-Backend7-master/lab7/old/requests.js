// Auth

fetch(config.url + '/api/auth', {
    method: 'POST',
    credentials: "same-origin",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: this.state.username, password: this.state.password})
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    sessionStorage.setItem("token", data.api_token);
    window.location.href = "/profile";
}).catch((e) => {
    alert("An error has occurred!");
});

// Register

fetch(config.url + '/api/register', {
    method: 'POST',
    credentials: "same-origin",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: this.state.username, password: this.state.password})
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    sessionStorage.setItem("token", data.api_token);
    window.location.href = "/profile";
}).catch((e) => {
    alert("An error has occurred!");
});

// Edit profile


let formData  = new FormData();
formData.append("name", this.state.name);
formData.append("surname", this.state.surname);
formData.append("status", this.state.status);
formData.append("birthday", (new Date(this.state.birthday)).getTime() / 1000);
formData.append("city_id", this.state.city_id);
formData.append("avatar", this.fileInput.current.files[0]);
formData.append("username", this.state.username);
formData.append("password", this.state.password);

fetch(config.url + '/api/profile', {
    method: 'PATCH',
    credentials: "same-origin",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    body: formData
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    window.location.href = "/profile";
}).catch((e) => {
    alert("An error has occurred!");
});

// Get profile

fetch(config.url + '/api/profile', {
    method: 'GET',
    credentials: "same-origin",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
   this.setState({
       name: data.name + " " + data.surname,
       birthday: data.birthday,
       city: data.city,
       photos: data.photos,
       posts: data.posts,
       status: data.status,
       avatar: data.avatar,
   });
}).catch((e) => {
    alert("An error has occurred!");
});

// Send post

fetch(config.url + '/api/profile/posts', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
    },
    body: JSON.stringify({text: this.state.postText})
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    console.log(data);
    this.setState({
        posts: data.posts
    });
    console.log(this.state.posts);
}).catch((e) => {
    alert("An error has occurred!");
});

// Edit post


fetch(config.url + '/api/profile/posts/'+id, {
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
    },
    body: JSON.stringify({text: text})
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    console.log(data);
    this.setState({
        posts: data.posts
    });
    console.log(this.state.posts);
}).catch((e) => {
    alert("An error has occurred!");
});

// Delete post

fetch(config.url + '/api/profile/posts/'+id, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
    }
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    console.log(data);
    this.setState({
        posts: data.posts
    });
    console.log(this.state.posts);
}).catch((e) => {
    alert("An error has occurred!");
});

// Send photo

let formData  = new FormData();

formData.append("photo", this.fileInput.current.files[0]);

fetch(config.url + '/api/profile/photos', {
    method: 'POST',
    credentials: "same-origin",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    body: formData
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    window.location.href = "/profile";
}).catch((e) => {
    alert("An error has occurred!");
});

// Delete photo

fetch(config.url + '/api/profile/photos/'+id, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
    }
}).then((response) => {
    if(response.status !== 200) {
        alert("An error has occurred!");
        return;
    }
    return response.json();
}).then((data) => {
    console.log(data);
    this.setState({
        posts: data.posts
    });
    console.log(this.state.posts);
}).catch((e) => {
    alert("An error has occurred!");
});
