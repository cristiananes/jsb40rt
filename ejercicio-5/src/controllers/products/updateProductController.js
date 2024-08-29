
import getPool from '../../db/getPool.js'
import generateErrorUtil from '../../utils/generateErrorUtil.js';


const updateProductController = async (req, res, next) => {
    try {
        const { nombre, precio } = req.body;
        console.log(req.body);
        if (!nombre && !precio) {
            generateErrorUtil(`faltan campos`, 400)
        }
        const { productId } = req.params;
        if (!productId) {
            generateErrorUtil(`falta el producto que quieres actualizar`, 400);
        }
        const pool = await getPool();

        const userId = req.user.id;

        if (nombre) {
            await pool.query(
                `UPDATE products SET  name =? WHERE id = ? AND userId = ? `, [nombre, productId, userId]
            )
        }
        if (precio) {
            await pool.query(
                `UPDATE products SET  price =? WHERE id = ? AND userId = ? `, [precio, productId, userId]
            )
        }
        res.send({
            status: "ok",
            message: "Producto actualizado",
        })
    } catch (e) {
        console.error(e);
        next(e);

    }
}
export default updateProductController;