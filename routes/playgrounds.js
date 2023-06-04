const router = require('express').Router()
const playgroundsCtrl = require('../controllers/playgrounds.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Protected Routes ----------*/

router.use(decodeUserFromToken)

router.get('/', checkAuth, playgroundsCtrl.getAllPlaygrounds)
router.get('/:id', checkAuth, playgroundsCtrl.getPlayground)
router.post('/', checkAuth, playgroundsCtrl.createPlayground)
router.put('/:id', checkAuth, playgroundsCtrl.updatePlayground)
router.delete('/:id', checkAuth, playgroundsCtrl.deletePlayground)

module.exports = router
