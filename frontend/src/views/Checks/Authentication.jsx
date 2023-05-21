function Authentication({children}){
    const pathRole = window.location.pathname.split("/")[1];
    const loggedInRole = JSON.parse(localStorage.getItem("loggedInUser"))

    console.log(pathRole.toLowerCase())
    console.log(loggedInRole.role)

    if(pathRole.toLowerCase() === loggedInRole.role.toLowerCase()){
        return children;
    } else {
        return <h1>You are not allowed to access this page</h1>
    }
}

export default Authentication