const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    message: `Welcome to rn-forum api! 🎉`
  });
});

module.exports = router;
