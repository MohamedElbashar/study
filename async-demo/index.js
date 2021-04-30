/** @format */

console.log("Before");
getuser(1, (user) => {
  console.log("user", user);
  getRepo(user.gitHubUserName, (repos) => {
    console.log(repos);
  });
  //
});
console.log("After");
function getuser(id, callback) {
  setTimeout(() => {
    console.log("reading a user...");
    callback({ id: id, gitHubUserName: "mosh" });
  }, 2000);
}
function getRepo(username, callback) {
  setTimeout(() => {
    console.log("...wait repo");
    callback(["repo1", "repo2", "repo3"]);
  }, 1000);
}
