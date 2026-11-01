import jwt from 'jsonwebtoken'
const isAdmin = (req, res, next) => {
    try {
        const token=req?.headers?.authorization?.split(' ')[1]
        if (!token) {
            throw new Error("No token provided");
        }
        const {role=null,id}=jwt.verify(token,process.env.JWT_SECRET)
       if (role !== 'admin') {
           throw new Error("You don't have permission to perform this action");
       }
       req.role = role;
       req.userId = id;
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"You don't have permission to perform this action"
        })
    }
};

export default isAdmin;
