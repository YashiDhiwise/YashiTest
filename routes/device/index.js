const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./Test_01Routes'));
router.use(require('./userRoutes'));

module.exports = router;
