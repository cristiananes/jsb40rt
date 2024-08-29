import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const activeUserController = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;
        let users;
        const pool = await getPool();
        try {


            [users] = await pool.query(
                `SELECT id FROM users WHERE registrationCode = ?`, [registrationCode]
            );
        } catch (e) {
            console.error(e);
            generateErrorUtil(`error consultando el registro`, 500)
        }
        if (users.length < 1) {
            generateErrorUtil(`codigo de registro invalido`, 401);
        }
        await pool.query(`UPDATE users SET registrationCode = NULL,
                        active = true WHERE registrationCode = ?`, [registrationCode]);

        res.send({
            status: "ok",
            message: "usuario activado",
        })

    } catch (err) {
        next(err)
    }
}
export default activeUserController;