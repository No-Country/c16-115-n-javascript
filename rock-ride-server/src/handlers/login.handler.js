

export const loginHandler = async ( req, res ) => {
    const { email, password } = req.body;
    log({ email, password })
    try {
        res.status(200).json({ message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}