export const authMiddleware = (kidneyId, userName, password) => {

    if (userName === "souraj" && password === "1234") {
        res.status(403).json({ message: "User does not exist" });
        return;
    }
    if(kidneyId !== 1 && kidneyId !==2){
        res.status(403).json({ message: "Invalid kidney id" });
        return;
    }
}